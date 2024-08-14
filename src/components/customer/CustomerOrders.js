import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { startGetMyOrders, startCancelOrder } from "../../actions/ordersAction";

export default function CustomerOrders() {
    const orders = useSelector((state) => {
        return state.orders.data
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetMyOrders)
    })

    const handleCancelOrder = (id) => {
        // console.log(id)
        dispatch(startCancelOrder(id))
    }
 
    console.log(orders)
    return (
        <div>
            <NavBar/>
            <h2 style={{ marginTop : '20px' }}>My Orders - {orders?.length}</h2>
            <div className="container d-flex gap-4 content-center">
                <div className="col-md-9 d-flex flex-column gap-2">
                    {orders && orders?.length !== 0 ? (
                        <div>
                            {orders?.map((ele)=>{
                                return(
                                    <div key={ele._id} className="order-body row card mb-2" style={{ width:'80%', height:'100%', margin: '0 auto'}}>
                                            <div className="order-head" style={{ textAlign: 'center' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ marginLeft: '5px'}}>Order Placed</span>
                                                    <span style={{ flex: 1, textAlign: 'center', marginLeft: '-15px' }}>Total Amount</span>
                                                    <span style={{ marginRight: '5px'}}>Shipped To</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ marginLeft: '5px'}}>{new Date(ele.createdAt).toLocaleDateString()}</span>
                                                    <span style={{ flex: 1, textAlign: 'center', marginLeft: '55px' }}>{ele.totalAmount}</span>
                                                    <span style={{ marginRight: '5px'}}>{ele.customer.username}</span>
                                                </div>
                                                <Link className="link-style" onClick={() => {
                                                    handleCancelOrder(ele._id)
                                                }}>Cancel Order</Link>
                                            </div>
                                                {ele.lineItems.map((lineItem) => {
                                                return (
                                                    <div className="row" key={lineItem._id}>
                                                        <div className="order-img col-md-4">
                                                            <img src={lineItem.design.frontImage.image_url} alt={`${lineItem.design.designName} design`} />
                                                        </div>
                                                        <div className="order-details col-md-8">
                                                            <div>
                                                            <h4>{lineItem.design.designName}</h4>
                                                            <p >Qty : {lineItem.quantity}</p>
                                                            <p >Amount : {lineItem.price * lineItem.quantity}</p>
                                                            </div>
                                                        </div>
                                                        {ele.lineItems.length > 0 && <hr style={{marginTop: "10px", marginLeft: "12px"}}/>}
                                                    </div>
                                                    )
                                                })}
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="row card" style={{width:'100%',height:'17rem'}}>
                            <p>go to <Link className="link-style" to="/cart">Cart</Link> to create a new Order</p>
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
                                No Orders yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}