import { Link } from "react-router-dom";

import { FaLocationDot } from "react-icons/fa6";
import { MdLocalShipping } from "react-icons/md";
import NavBar from "../NavBar";

export default function CustomerAccount() {

    return (
        <div>
            <NavBar />
            <h2 style={{marginTop : "20px"}}>Your Account</h2>
            <div className='address-order-card d-flex justify-content-center gap-2'>
                    <Link to="/customer-addresses" style={{ textDecoration: 'none' }}>
                        <div className='card'>
                            <div className='card-body'>
                                <FaLocationDot className="icon" style={{ marginRight: '200px', marginTop : '20px'}}/>
                                <p style={{marginTop: '-45px', marginLeft:'50px', fontSize: '25px'}}>Your Addresses</p>
                                <p style={{marginTop : '20px'}}>Edit your Addresses for Orders </p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/customer-orders" style={{ textDecoration: 'none' }}>
                        <div className='card'>
                            <div className='card-body'>
                                <MdLocalShipping className="icon" style={{ marginRight: '180px', marginTop : '20px'}}/>
                                <p style={{marginTop: '-45px', marginLeft:'40px', fontSize: '25px'}}>Your Orders</p>
                                <p style={{marginTop : '20px'}}>See your Orders here </p>
                            </div>
                        </div>
                    </Link>
            </div>
        </div>
    )
}
