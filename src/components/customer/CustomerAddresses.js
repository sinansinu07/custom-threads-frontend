import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddressForm from "./AddressForm";
import { startDeleteAddress, startGetAddresses, startSetDefaultAddress } from "../../actions/addressesAction"
import { Link } from "react-router-dom";

import { MdAdd } from "react-icons/md";
import NavBar from "../NavBar";

export default function CustomerAddresses() {

    const { user } = useAuth()  
    const dispatch = useDispatch() 

    useEffect(() => {
        dispatch(startGetAddresses());
    }, [dispatch])

    const [ modal1, setModal1 ] = useState(false)
    const [ modal2, setModal2 ] = useState(false)
    const [ editId, setEditId ] = useState("")

    const toggle1 = () => {
        setModal1(!modal1)
    }

    const toggle2 = () => {
        setModal2(!modal2)
    }

    const addresses = useSelector((state) => {
        return state.addresses
    })

    const handleDelete = (id) => {
        const userConfirmation = window.confirm("Are You Sure!")
        if(userConfirmation) {
            dispatch(startDeleteAddress(id))
        }
    }

    const handleSetDefault = async (id) => {
        dispatch(startSetDefaultAddress(id))
    }

    return (
        <div>
            <div>
                <NavBar />
                <div >
                    <h2 style={{marginTop: '20px'}}>
                        Your Addresses
                    </h2>
                    {addresses.data.length === 0 ? (
                        <div>
                            <h4>No Addresses. Add your First Address</h4>
                            <Link className="content-center" style={{border : "none", marginTop : "20px"}} onClick={() => {toggle1()}}>
                                <div className="card" style={{ width: '18rem', height: '15rem'}}>
                                    <div className="card-body">
                                        <MdAdd className="add-button"/>
                                        <span className="add-address">Add Address</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="address-card gap-2">
                            <Link style={{border : "none", textDecoration : "none"}} onClick={() => {toggle1()}}>
                                <div className="card">
                                    <div className="card-body">
                                        <MdAdd className="add-button"/><br/>
                                        <span className="add-address">Add Address</span>
                                    </div>
                                </div>
                            </Link>
                            {addresses.data.map((ele) => {
                                return (
                                    <div className="card">
                                        <div className="card-body" style={{ textAlign: 'left', marginTop: '10px'}}>
                                            <h5>{ele.name}</h5><br/>
                                            {ele.addressNo}<br/>
                                            {ele.street}<br/>
                                            {ele.city}<br/>
                                            {ele.state}<br/>
                                            {ele.pincode}<br/>
                                            <div className="buttons" style={{marginTop: '30px'}}>
                                                <Link className="edit-delete-button" style={{marginRight: '10px'}} onClick={() => {
                                                    setEditId(ele._id)
                                                    toggle2()
                                                }}> Edit </Link>  |
                                                <Link className="edit-delete-button" style={{marginLeft: '10px'}} onClick={() => {
                                                    handleDelete(ele._id)
                                                }}> Delete </Link> {!ele.isDefault && <> | </>}
                                                {!ele.isDefault && (
                                                    <Link className="edit-delete-button" style={{marginLeft: '10px'}} onClick={() => {
                                                        handleSetDefault(ele._id)
                                                    }}> Set as Default </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                    )}
                </div>
                <div>
                    <Modal isOpen={modal1} toggle={toggle1}>
                        <ModalHeader toggle={toggle1}>Add Address</ModalHeader>
                        <ModalBody>
                            <AddressForm  toggle={toggle1}/>
                        </ModalBody>
                    </Modal>
                    <Modal isOpen={modal2} toggle={toggle2}>
                        <ModalHeader toggle={toggle2}>Edit Address - {user.username}</ModalHeader>
                        <ModalBody>
                            <AddressForm  toggle={toggle2} editId={editId}/>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </div>
    )
}