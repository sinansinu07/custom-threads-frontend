import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { MdAddShoppingCart,MdDelete } from "react-icons/md";
import { useAuth } from "../../context/AuthContext"
import { Dropdown } from 'react-bootstrap';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from "react-router-dom"
import { useState,useEffect } from "react"
import { useSelector,useDispatch } from 'react-redux';
import NavBar from '../NavBar'
import { startCreateCart } from '../../actions/cartAction';
import { startRemoveDesign } from '../../actions/designsAction';
import { startCreateOrder } from '../../actions/ordersAction';
import axios from 'axios';

import render from "../../api/api"
import localhost from "../../api/api"



export default function CustomerContainer() {

    const [isHover, setIsHover] = useState(false);
    const dispatch=useDispatch()
    const categories = useSelector((state)=>{
        return state.categories.data
    })

    const designs = useSelector((state)=>{
        return state.designs.data
    })
    const { user } = useAuth()
   
    const [ selectCategoryModal,seSelectCategoryModal] = useState(false)

    const selectCategoryToggle = ()=>{
        seSelectCategoryModal(!selectCategoryModal)
    }

    // const [cart,setCart] = useState({
    //     lineItems:[]
    // })
    
    const addToCart = async (designId) => {
        const cart = {
            lineItems : [
                {
                    design: designId,
                    quantity: 1
                }
            ]
        }
        // setCart((prevCart) => {
        //     const newLineItems = [...prevCart.lineItems, { design: designId, quantity: 1 }];
        //     return {...prevCart, lineItems: newLineItems };
        // });
        // setCart({
        //     lineItems: [...cart.lineItems, { design: designId, quantity: 1 }]
        // });
        // console.log('cart',cart)
        dispatch(startCreateCart(cart));
    };

    // useEffect(() => {
    //     if (cart.lineItems.length > 0) {
    //         dispatch(startCreateCart(cart));
    //     }
    // }, [cart, dispatch]);

    useEffect(()=>{
        (async()=>{
            try{
                const stripeId = localStorage.getItem('stripeId')
                if(stripeId) {
                    const response = await axios.put(`${render}/api/user/payment/${stripeId}/success`,{paymentStatus:"Successful"}, {
                        headers:{
                            'Authorization' : localStorage.getItem('token')
                        }
                    })
                    const payment = response.data
                    console.log(payment)
                    const paymentId = payment._id
                    dispatch(startCreateOrder(paymentId))
                }
                localStorage.removeItem('stripeId')
            } catch(err){
                console.log(err)
            }
        })()
    },[])

    const handleDelete = (id)=>{
        const confirmation = window.confirm('are you sure ?')
        if(confirmation){
            dispatch(startRemoveDesign(id))
        }
    }
    const calculateDesignPrice = (ele)=>{
        let total = 0
        total += parseFloat(ele.charges) + parseFloat(ele.product.price) + ele.customization.reduce((acc, cv) => acc + parseFloat(cv.amount), 0)
        return total
    }

    return (
        <div>
            {user && (
                <div>
                    <NavBar/>
                    <h2>Welcome {user.username}</h2>
                    <hr/>
                </div>
                 )}
                 <div className='d-flex flex-column justify-content-start '>
                    <h2 style={{ marginTop : '20px' }}>Your designs</h2>
                    <div className='d-flex flex-wrap justify-content-center gap-2'>
                        <div className='d-flex flex-wrap gap-2'>
                            {designs&&designs.map((ele)=>{
                                return (
                                    <div  className='d-flex'>
                                        <div key ={ele._id} className="card" style={{ width: '14rem',height:'18rem' }}
                                            onMouseEnter={() => setIsHover(true)}
                                            onMouseLeave={() => setIsHover(false)}>
                                            <div
                                                className="d-flex justify-content-end position-absolute"
                                                style={{
                                                top: 0,
                                                right: 0,
                                                opacity: isHover? 1 : 0,
                                                transition: 'opacity 0.2s ease',
                                                }}
                                            >
                                                <Dropdown>
                                                    <Dropdown.Toggle  className="p-0" style={{ backgroundColor: 'transparent', border: 'none' }}>
                                                        <i className="bi bi-three-dots-vertical" style={{ fontSize: '1.5rem', color:'GrayText' }}></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={()=>handleDelete(ele._id)}><MdDelete style={{fontSize:'2rem'}}/>Delete</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                            {/* <Link to="#"> */}
                                                <img src={ele.frontImage.image_url} className="card-img-top" alt={`${ele?.designName} design`} style={{height: '12 rem', maxWidth: '90%', objectFit: 'cover'}} />
                                            {/* </Link> */}
                                            <div className='card-body py-0 px-0 d-flex flex-column' style={{ height: '100%' }}>
                                                <h5 className="">{ele?.designName}</h5>
                                                <div className='d-flex justify-content-between py-1 px-1'>
                                                    <div className='d-flex flex-column align-items-start'>
                                                    <h6 className='mb-0' style={{color:'GrayText'}}>price:
                                                        <span style={{color:"black"}}>{calculateDesignPrice(ele)}</span></h6>
                                                        <h6 className='mb-0' style={{color:'GrayText'}}>size:<span style={{color:"black"}}>{ele.size?.sizeName}</span></h6>
                                                    </div>
                                                    <button style={{border:'none',backgroundColor:'white'}} onClick={()=>addToCart(ele._id,calculateDesignPrice(ele))}><MdAddShoppingCart style={{fontSize:'2rem'}}/></button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <Link onClick={()=>{selectCategoryToggle()}}>
                            <div className="card" style={{ width: '14rem',height:'18rem' }}>
                                <div className="card-body">
                                    <h1 className="card-title">+</h1>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                    
                 </div>
         

           <Modal isOpen={selectCategoryModal} toggle={selectCategoryToggle}>
                <ModalHeader toggle={selectCategoryToggle}> select category</ModalHeader>
                <ModalBody>
                    {categories&&
                        <div>
                            {categories.map((category)=>{
                                return(
                                    <div className="d-flex">
                                        <div key={category._id} className="card" style={{ width: '12rem',height:'16rem' }}>
                                        <Link to={`/select-product/${category._id}`} >
                                            <img src={category.image.image_url} className="card-img-top" alt={`${category.name} category`} style={{height: '10rem', maxWidth: '100%', objectFit: 'cover'}} />
                                        </Link>
                                            <div className="card-body d-flex flex-column" style={{ height: '100%' }}>
                                                <h4 className="card-title mt-auto">{category.name}</h4>
                                            </div>
                                        </div>
                                </div>
                                )
                            })}
                        </div>
                    }
                </ModalBody>
           </Modal>

        </div>
    )
}

