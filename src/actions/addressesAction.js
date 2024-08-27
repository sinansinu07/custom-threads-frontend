import axios from "axios";
import render from "../api/api"

export const startGetAddresses = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${render}/api/user/address`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            dispatch(setAddress(response.data))
            // console.log(response.data)
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const setAddress = (addresses) => {
    return {
        type: "SET_ADDRESSES",
        payload: addresses
    }
}

export const startCreateAddress = (formData, toggle1) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${render}/api/user/address`, formData, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            dispatch(addAddress(response.data))
            toggle1()
            console.log(response.data)
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const addAddress = (address) => {
    return {
        type: "ADD_ADDRESS",
        payload: address
    }
}

export const startUpdateAddress =  (id, formData, toggle2) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${render}/api/user/address/${id}`, formData, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            dispatch(updateAddress(response.data))
            toggle2()
        } catch(err) {
            alert(err.message)
            console.log(err)
        }
    }
}

const updateAddress = (address) => {
    return {
        type: "UPDATE_ADDRESS",
        payload: address
    }
}

export const startDeleteAddress = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${render}/api/user/address/${id}`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            dispatch(deleteAddress(response.data))
        } catch(err) {
            alert(err.message)
            console.log(err)
        }
    }
}

const deleteAddress = (id) => {
    return {
        type: "DELETE_ADDRESS",
        payload: id
    }
}

export const startSetDefaultAddress = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${render}/api/user/address/${id}/setDefault`, {}, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            alert('Default address changed')
            dispatch(setDefaultAddress(response.data))
        } catch(err) {
            alert(err.message)
            console.log(err)
        }
    }
}

const setDefaultAddress = (addresses) => {
    return {
        type: "SET_DEFAULT_ADDRESS",
        payload : addresses
    }
}