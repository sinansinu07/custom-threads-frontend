import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import {startDeleteCategory} from "../../actions/categoriesAction"
import CreateCategory from "./createCategory";
import AdminNavBar from "./AdminNavBar"

export default function ManageCategory(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [editId,setEditId] = useState("")
    const [modal,setModal] = useState(false)
    const toggle = ()=>{
        setModal(!modal)
    }

    const categories = useSelector((state) => {
        return state.categories.data
    })
    const handleDelete =(id)=>{
        const confirmation = window.confirm('are you sure ?')
        if(confirmation){
            dispatch(startDeleteCategory(id,navigate))
        }
    }
    const handleEdit=(id)=>{
        setEditId(id)
        toggle()
    }

    const category = useSelector((state) => {
        return state.categories.data.find(ele => ele._id === editId)
    })
    return (
        <div>
            <AdminNavBar />
            <h1>Manage Category</h1>
            <hr/>
            <div className="d-flex flex-wrap justify-content-center gap-2">
                {categories&&(
                    <div className="d-flex flex-wrap gap-2">
                        {categories.map((ele)=>{
                            return(
                                <div className="d-flex">
                                        <div className="card" style={{ width: '12rem',height:'16rem' }}>
                                        <Link to={`/manage-product/${ele._id}`} >
                                            <img src={ele.image.image_url} className="card-img-top" alt={`${ele.name} category`} style={{height: '10rem', maxWidth: '100%', objectFit: 'cover'}} />
                                        </Link>
                                            <div className="card-body d-flex flex-column" style={{ height: '100%' }}>
                                                <h4 className="card-title mt-auto">{ele.name}</h4>
                                                <div className="d-flex justify-content-between mt-auto">
                                                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(ele._id)}>
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-sm btn-primary" onClick={() => handleDelete(ele._id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            )
                        })}
                    </div>
                )}
                <div>
                    <Link to="/create-category" >
                        <div className="card" style={{ width: '12rem',height:'16rem' }}>
                            <div className="card-body">
                                <h1 className="card-title">+</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                
            </div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Edit Category - {category&&category.name} </ModalHeader>
                        <ModalBody>
                            <CreateCategory  toggle={toggle} editId={editId}/>
                        </ModalBody>
                    </Modal>
        </div>

    )
}