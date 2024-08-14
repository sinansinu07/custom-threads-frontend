// import { CgProfile } from "react-icons/cg";
// import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate,useLocation} from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { LuLogOut } from "react-icons/lu";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function NavBar() {

    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const location = useLocation();
    const isCartPage = location.pathname === "/cart";
    const isOrderPage = location.pathname === "/customer-orders"

    const [ modal, setModal ] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }

    return (
        <div>
            <Nav className="nav-bar justify-content-between">
                <NavItem>
                    <NavLink className="nav-items" active href="/customer-container">
                    Home
                    </NavLink>
                </NavItem>
                <Nav>
                {!isOrderPage && (
                    <NavItem>
                        <NavLink className="nav-items" active href="/customer-orders">
                            Orders
                        </NavLink>
                    </NavItem>
                )}
                {!isCartPage && (
                    <NavItem>
                        <NavLink className="nav-items" href="/cart">
                            Cart
                        </NavLink>
                    </NavItem>
                )}
                    <NavItem>
                        <NavLink className="nav-items" style={{ cursor: "pointer" }} onClick={() => {toggle()}}>
                            Profile
                        {/* <Link className="button" ><CgProfile className="profile-icon"/></Link> */}
                        </NavLink>
                    </NavItem>
                </Nav>
            </Nav>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}> hii {user.username}</ModalHeader>
                <ModalBody style={{height: "100px", paddingTop: "20px"}}>
                    <div>
                        <Link className="link-style" to="/customer-profile">Manage Profile</Link>
                    </div>
                    <div style={{marginTop: "10px"}}>
                        <Link className="link-style" to="/customer-account">Customer Account</Link><br/>
                    </div>
                    <div className="text-end">
                        <p className='logout-text'>Logout</p>
                        <Link className="button" onClick={() => {
                            const confirmation = window.confirm("Are you sure to Logout")
                            if(confirmation) {
                                localStorage.removeItem("token")
                                handleLogout()
                                navigate("/")
                                window.location.reload()
                            }
                            }}>
                            <LuLogOut className="logout-icon"/>
                        </Link>
                    </div>
                </ModalBody>
           </Modal>
        </div>
    )
}