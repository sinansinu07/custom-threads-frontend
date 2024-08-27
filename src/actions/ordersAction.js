import axios from "axios"
import render from "../api/api"

export const startGetAllOrders = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${render}/api/user/order/allOrders`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            console.log(response.data)
            dispatch(setAllOrders(response.data))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const setAllOrders = (orders) => {
    return {
        type : "SET_ALL_ORDERS",
        payload : orders
    }
}

export const startGetMyOrders = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${render}/api/user/order/myOrders`, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            // console.log(response.data)
            dispatch(setOrders(response.data))
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const setOrders = (orders) => {
    return {
        type : "SET_ORDERS",
        payload : orders
    }
}

export const startCreateOrder = (paymentId) => {
    return async (dispatch) => {
        try {
            const orderResponse = await axios.post(`${render}/api/user/order/${paymentId}`, {}, {
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            })
            const order = orderResponse.data
            dispatch(addOrder(order))
            // console.log(order)
            alert("Payment Successful, Your Order is Placed")
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const addOrder = (order) => {
    return {
        type : "ADD_ORDER",
        payload : order
    }
}

export const startCancelOrder = (id) => {
    return async (dispatch) => {
        try {
            const orderResponse = await axios.put(`${render}/api/user/order/${id}`, { status : "Canceled"}, {
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            })
            dispatch(cancelOrder(orderResponse.data))
            alert("Order Canceled Successfully")
            console.log(orderResponse.data)
        } catch(err) {
            console.log(err)
            alert(err.message)
        }
    }
}

const cancelOrder = (order) => {
    return {
        type : "CANCEL_ORDER",
        payload : order
    }
}