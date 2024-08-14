import { useParams } from "react-router"
import { useSelector,useDispatch } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { startGetCategoryProducts,startDeleteProduct } from "../../actions/prodcutsAction"
import CreateProduct from "./createProduct";
import AdminNavBar from "./AdminNavBar"

export default function ManageProduct(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [editId,setEditId] = useState("")
    const [modal,setModal] = useState(false)
    const toggle = ()=>{
        setModal(!modal)
    }
    const {categoryId} = useParams()

    const category = useSelector((state) => {
        return state.categories.data.find(ele => ele._id === categoryId)
    })
    useEffect(()=>{
        
           dispatch(startGetCategoryProducts(categoryId) )
       
    },[dispatch, categoryId])

    const products = useSelector((state)=>{
        return  state.products.data
    })

    const handleEdit=(id)=>{
        setEditId(id)
        toggle()
    }

    const product = useSelector((state) => {
        return state.products.data.find(ele => ele._id === editId)
    })
    const handleDelete = (id)=>{
        const confirmation = window.confirm('are you sure ?')
        if(confirmation){
            dispatch(startDeleteProduct(id))
        }
    }
    return (
        <div>
            <AdminNavBar />
            <h1>Manage Product for {category&&category.name}</h1>
            <hr/>
            <div className="d-flex flex-wrap justify-content-center gap-2">
                <div className="d-flex flex-wrap gap-2">
                    {products&&products.map((ele)=>{
                        return (
                            <div className="d-flex">
                                        <div className="card" style={{ width: '12rem',height:'16rem' }}>
                                        <Link to={`/show-product/${categoryId}/${ele._id}`} >
                                            <img src={ele.frontImage.image_url} className="card-img-top" alt={`${ele.name} category`} style={{height: '10rem', maxWidth: '100%', objectFit: 'cover'}} />
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
                    <Link to={`/create-product/${categoryId}`} >
                        <div className="card" style={{ width: '12rem',height:'16rem' }}>
                            <div className="card-body">
                                <h1 className="card-title">+</h1>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>Edit Category - {product&&product.name} </ModalHeader>
                        <ModalBody>
                            <CreateProduct  toggle={toggle} editId={editId}/>
                        </ModalBody>
                    </Modal>
        </div>
    )
}