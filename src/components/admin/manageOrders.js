import { useDispatch, useSelector } from "react-redux";
import AdminNavBar from "./AdminNavBar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { startGetAllOrders } from "../../actions/ordersAction";

export default function CustomerOrders() {
    const orders = useSelector((state) => {
        return state.orders.data
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetAllOrders)
    })

    console.log(orders)
    return (
        <div>
            <AdminNavBar/>
            <h2 style={{ marginTop : '20px' }}>All Orders - {orders?.length}</h2>
            <div className="container d-flex gap-4 content-center">
                <div className="col-md-9 d-flex flex-column gap-2">
                        <div>
                            {orders?.map((ele)=>{
                                return(
                                    <div key={ele._id} className="order-body row card mb-2" style={{ width:'80%', height:'100%', margin: '0 auto'}}>
                                            <div className="order-head" style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span style={{ marginLeft: '5px'}}>Order Placed</span>
                                                <span style={{ flex: 1, textAlign: 'center', marginRight: '30px' }}>Total Amount</span>
                                                <span style={{ marginRight: '5px'}}>Shipped To</span>
                                            </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span style={{ marginLeft: '5px'}}>Date</span>
                                                    <span style={{ flex: 1, textAlign: 'center', marginRight: 'auto' }}>{ele.totalAmount}</span>
                                                    <span style={{ marginRight: '5px'}}>Details</span>
                                                </div>
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
                                                            <Link className="cancel-order">Cancel Order</Link>
                                                            </div>
                                                        </div>
                                                        {ele.lineItems.length > 0 && <hr className="content-center" style={{marginTop: "20px"}}/>}
                                                    </div>
                                                    )
                                                })}
                                    </div>
                                )
                            })}
                        </div>
                </div>
            </div>
        </div>
    )
}