import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../context/AuthContext"
import { Button } from "reactstrap"
// import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link, useNavigate } from "react-router-dom"
import AdminNavBar from "./AdminNavBar"
// import { useState } from "react"
export default function AdminContainer() {
    const {user,handleLogout} = useAuth()
    const navigate = useNavigate()
    return (
        <div>
            {user&&(
                <>
                <AdminNavBar />
                <h2>Welcome Admin</h2>
                <div className='d-flex justify-content-center gap-2' >
                    <Link to="/manage-orders">
                        <div className='card' style={{ width: '18rem' }}>
                            <div className='card-body'>
                                Manage Orders
                            </div>
                        </div>
                    </Link>
                    <Link to="/manage-category">
                        <div className='card' style={{ width: '18rem' }}>
                            <div className='card-body'>
                                Manage Category
                            </div>
                        </div>
                    </Link>
                </div>
                </>
            )}
            
        </div>
    )
}