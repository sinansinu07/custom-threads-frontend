import NavBar from "../NavBar"
import { useSelector,useDispatch } from "react-redux"
import { FaRupeeSign } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { startGetMyCart, startDeleteMyCartLineItem, startIncQty, startDecQty, startEmptyCart } from "../../actions/cartAction";
import { Button } from "reactstrap";
import { useEffect } from "react";
import axios from "axios";

import render from "../../api/api"
import localhost from "../../api/api"



export default function CartContainer(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetMyCart())
    }, [dispatch])

    useEffect(()=>{
        (async()=>{
            try{
                const stripeId = localStorage.getItem('stripeId')
                if(stripeId) {
                    await axios.put(`${render}/api/user/payment/${stripeId}/failed`,{paymentStatus:"Failed"}, {
                        headers:{
                            'Authorization' : localStorage.getItem('token')
                        }
                    })
                    alert("Payment Failed")
                }
                localStorage.removeItem('stripeId')
            }catch(err){
                console.log(err)
            }
        })()
    },[])

    const cart = useSelector((state)=>{
        return state.cart.data
    })

    console.log('cart now',cart)

 
    // console.log(cart)

    const handleDelete = (id) => {
        const userConfirmation = window.confirm("Are you sure to remove the LinItem ?")
        if(userConfirmation) {
            // console.log("hii")
            dispatch(startDeleteMyCartLineItem(id))
            
        }
    }

    const handleIncQty = (id) => {
        // console.log("Inc", id)
        dispatch(startIncQty(id))
    }

    const handleDecQty = (id) => {
        // console.log("Dec", id)
        dispatch(startDecQty(id))
    }

    const handleEmptyCart = () => {
        if(!cart) {
            alert("Cart is Already Empty")
        } else {
            const userConfirmation = window.confirm("Are you sure to Empty the Cart items ?")
            if(userConfirmation) {
                dispatch(startEmptyCart())
            }
        }
    }
    
    const handlePayment = async () => {
        try{
            if(cart) {
                const response = await axios.post('http://localhost:5000/api/user/payment/', {}, {
                    headers:{
                        'Authorization' : localStorage.getItem('token')
                    }
                })
                
                //Store the transaction id in local storage
                localStorage.setItem('stripeId', response.data.id)
                
                //Redirecting the user to the chekout page of stripe
                window.location = response.data.url; 
            } else {
                alert("Your Cart is Empty")
            }
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <NavBar/>
            <h2 style={{ marginTop : '20px' }}>My Cart</h2>
            <div className="container d-flex gap-4">
                <div className="col-md-9 d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between px-4 m-0">
                    <Link className="link-style" onClick={() => {
                        handleEmptyCart()
                    }}style={{marginRight: "20px"}}>Empty Cart</Link>
                        <h6 className="" style={{marginRight: "20px"}}>Price</h6>
                    </div>
                    {cart && cart?.lineItems?.length !== 0 ? (
                        <div>
                            {cart?.lineItems?.map((ele)=>{
                                return(
                                    <div key={ele._id} className="row card mb-2" style={{width:'100%',height:'17rem'}}>
                                        <div className="cart-img col-md-4">
                                            <img src={ele.design.frontImage.image_url} alt={`${ele.design.designName} design`}/>
                                        </div>
                                        <div className="cart-details col-md-8">
                                            <h4>{ele.design.designName}</h4>
                                            <span className="price"><span style={{position: "relative", top :"-1px"}}><FaRupeeSign/></span>{ele.price}</span>
                                            <span className="color"><span style={{fontWeight : "500"}}> Color : </span><span style={{marginLeft: "10px"}}>{ele.design.color.colorName}</span></span>
                                            <span className="size"><span style={{fontWeight : "500"}}> Size : </span><span style={{marginLeft: "10px"}}>{ele.design.size.sizeName}</span></span>
                                            <span className="qty"><span style={{fontWeight : "500"}}> Qty : </span>
                                                <IoIosArrowUp className="qty-value-up" style={{ position: 'relative', top: '-16px', left: '25px' }} 
                                                    onClick={() => {
                                                        handleIncQty(ele._id)
                                                    }}/>
                                                <span className="qty-value"> {ele.quantity} </span>
                                                <IoIosArrowDown className="qty-value-down" 
                                                    style={{ position: 'relative', bottom: '-29px', left: '-25px', pointerEvents: ele.quantity === 1 ? 'none' : 'auto' }} 
                                                    onClick={() => {
                                                        handleDecQty(ele._id)
                                                    }}
                                                />
                                            </span>
                                            <Link className="delete-button" onClick={() => {
                                                            handleDelete(ele._id)
                                                        }}> Delete </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="row card" style={{width:'100%',height:'17rem'}}>
                            <p>go to <Link className="link-style" to="/customer-container">Home</Link> to add a new design to the cart</p>
                            <p className="content-center" style={{
                                fontSize: '1.5rem',
                                fontWeight: 500,
                                textAlign: 'center',
                                margin: 'auto',
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}>
                                Your Cart is Empty</p>
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column gap-4">
                    <div id='checkout-card ' className="card" style={{top: '35px', width:'20rem',height:'11rem'}}>
                        <div className="card-body d-flex flex-column align-items-start justify-content-between">
                            <div className="d-flex flex-column align-items-start">
                                <h4>Sub-total</h4>
                                <h6>Amount</h6>
                                {!cart || cart?.lineItems?.length === 0 ? 0 : cart?.totalAmount}
                            </div>
                            <div className="mt-auto"> 
                                <Button onClick={handlePayment} className="cart-button-style">proceed to checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}