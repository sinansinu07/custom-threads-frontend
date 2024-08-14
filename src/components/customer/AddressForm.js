// import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { startCreateAddress, startUpdateAddress } from "../../actions/addressesAction"

export default function AddressForm(props) {

    const dispatch = useDispatch()

    // const { user } = useAuth()

    const address = useSelector((state) => {
        return state.addresses.data.find(ele => ele._id === props.editId)
    })

    const [ form, setForm ] = useState(address ? {
        name :  address.name,
        addressNo : address.addressNo,
        street : address.street,
        city : address.city,
        state : address.state,
        pincode : address.pincode
    } : {
        name : "",
        addressNo : "",
        street : "",
        city : "",
        state : "",
        pincode : ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(address) {
            dispatch(startUpdateAddress(address._id, form, props.toggle))
        } else {
            dispatch(startCreateAddress(form, props.toggle))
        }
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="name"
                    >Name</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        id="name"
                        name="name"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="addressNo"
                    >Address No</label>
                    <input
                        type="text"
                        value={form.addressNo}
                        onChange={handleChange}
                        id="addressNo"
                        name="addressNo"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form=label"
                        htmlFor="street"
                    >Street</label>
                    <input
                        type="text"
                        value={form.street}
                        onChange={handleChange}
                        id="street"
                        name="street"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form=label"
                        htmlFor="city"
                    >City</label>
                    <input
                        type="text"
                        value={form.city}
                        onChange={handleChange}
                        id="city"
                        name="city"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form=label"
                        htmlFor="state"
                    >State</label>
                    <input
                        type="text"
                        value={form.state}
                        onChange={handleChange}
                        id="state"
                        name="state"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label 
                        className="form=label"
                        htmlFor="pincode"
                    >Pincode</label>
                    <input
                        type="text"
                        value={form.pincode}
                        onChange={handleChange}
                        id="pincode"
                        name="pincode"
                        className="form-control"
                    />
                </div>
                <input type="submit" onClick={handleSubmit}  className="button-style btn btn-primary" style={{ width: "20%", marginTop: "10px" }}/>
            </form>
        </div>
    )
}