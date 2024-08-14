import { useParams } from "react-router"
import { useSelector,useDispatch } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import { useEffect,useState } from "react"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { startGetCategoryProducts } from "../../actions/prodcutsAction"
import NavBar from '../NavBar';

export default function SelectProduct(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {categoryId} = useParams()

    const category = useSelector((state) => {
        return state.categories.data.find(ele => ele._id === categoryId)
    })

    useEffect(()=>{
        
        dispatch(startGetCategoryProducts(categoryId) )
    },[])

    const products = useSelector((state)=>{
        return  state.products.data
    })
    return (
        <div>
            <NavBar />
            <h1>{`Select ${category&&category.name} type`}</h1>
            <div className="d-flex flex-wrap justify-content-center gap-2">
                {products&&
                <div className="d-flex flex-wrap gap-2">
                    {products.map((ele)=>{
                        return(
                            <div className="d-flex">
                                <div className="card" style={{ width: '12rem',height:'16rem' }}>
                                    <Link to={`/create-design/${categoryId}/${ele._id}`} >
                                        <img src={ele.frontImage.image_url} className="card-img-top" alt={`${ele.name} category`} style={{height: '11rem', maxWidth: '100%', objectFit: 'cover'}} />
                                    </Link>
                                    <div className="card-body d-flex flex-column" style={{ height: '100%' }}>
                                        <h4 className="card-title mt-auto">{ele.name}</h4>
                                        <p>{`price:${ele.price}`}</p>
                                    </div>
                            </div>
                            </div>
                        )
                    })}
                    
                </div>
                }
                
            </div>
        </div>
    )
}