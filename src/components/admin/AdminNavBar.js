// import { CgProfile } from "react-icons/cg";
// import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import { Button } from "bootstrap";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function NavBar() {

    const { handleLogout } = useAuth()
    const navigate = useNavigate()

    return (
        <div>
            <Nav className="nav-bar justify-content-between">
                <NavItem>
                    <NavLink className="nav-items" active href="/admin-container">
                    Home
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className="nav-items" onClick={() => {
                        const confirmation = window.confirm("Are you sure to Logout")
                        if(confirmation) {
                            localStorage.removeItem("token")
                            handleLogout()
                            navigate("/")
                            window.location.reload()
                        }
                    }}>
                        logout
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}