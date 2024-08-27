import axios from 'axios'
import {render, localhost} from "../api/api"


export const startCreateCart=(cart)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.post(`${render}/api/user/cart/`,cart,{
                headers:{
                    'Authorization' : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(createCart(response.data))
            alert('item added to cart')
        }catch(err){
            console.log(err)
        }
    }
}
const createCart =(cartItems)=>{
    return{
        type:'CREATE_CART',
        payload:cartItems
    }
}

export const startGetMyCart = ()=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get(`${render}/api/user/cart/`,{
                headers:{
                    "Authorization" : localStorage.getItem('token')
                }
            })
            // console.log(response.data)
            dispatch(getMyCart(response.data))
        }catch(err){
            console.log(err)
        }
    }
}
const getMyCart = (myCart)=>{
    return{
        type:"GET_CART",
        payload:myCart
    }
}

export const startDeleteMyCartLineItem = (id) => {
    return async(dispatch) => {
        try {
            // console.log("hii 2")
            const response = await axios.delete(`${render}/api/user/cart/${id}`, {
                headers : {
                    "Authorization" : localStorage.getItem('token')
                }
            })
            const lineItem= response.data.lineItems.find((ele)=>{
                return ele._id === id
            })
            dispatch(deleteMyCartLineItem(response.data))
            // window.location.reload()
            console.log(id, response.data)
        } catch(err) {
            console.log(err)
        }
    }
}

const deleteMyCartLineItem = (lineItem) => {
    return {
        type : "DELETE_LINEITEM",
        payload : lineItem
    }
}

export const startIncQty = (id) => {
    return async(dispatch) => {
        try {
            const response = await axios.put(`${render}/api/user/cart/inc/${id}`, {}, {
                headers : {
                    "Authorization" : localStorage.getItem('token')
                }
            })
            const lineItem= response.data.lineItems.find((ele)=>{
                return ele._id === id
            })
            
            dispatch(incQty(lineItem))
            // console.log(id, response.data)
            // console.log(lineItem)
        } catch(err) {
            console.log(err)
        }
    }
}

const incQty = (lineItem) => {
    return {
        type : "INC_QTY",
        payload : lineItem
    }
}

export const startDecQty = (id) => {
    return async(dispatch) => {
        try {
            const response = await axios.put(`${render}/api/user/cart/dec/${id}`, {}, {
                headers : {
                    "Authorization" : localStorage.getItem('token')
                }
            })
            const lineItem= response.data.lineItems.find((ele)=>{
                return ele._id === id
            })
            
            dispatch(decQty(lineItem))
            // console.log(id, response.data)
            // window.location.reload()
        } catch(err) {
            console.log(err)
        }
    }
}

const decQty = (lineItem) => {
    return {
        type : "DEC_QTY",
        payload : lineItem
    }
}

export const startEmptyCart = () => {
    return async(dispatch) => {
        try {
            const response = await axios.delete(`${render}/api/user/cart`, {
                headers : {
                    "Authorization" : localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(emptyCart(response.data))
        } catch(err) {
            console.log(err)
        }
    }
}

const emptyCart = (cart) => {
    return {
        type : "EMPTY_CART",
        payload : cart
    }
}