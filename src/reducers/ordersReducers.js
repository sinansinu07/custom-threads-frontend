const initialState = {
    data : [],
    serverErrors : []
}

export default function ordersReducers(state = initialState, action) {
    switch (action.type) {
        case "SET_ALL_ORDERS" : {
            return { ...state, data : action.payload }
        }
        case "SET_ORDERS" : {
            return { ...state, data : action.payload }
        }
        case "ADD_ORDER" :{
            return { ...state, data : [...state.data, action.payload] }
        }
        case "CANCEL_ORDER" : {
            return { ...state, data : state.data.filter(order => order._id !== action.payload._id) }
        }
        default : {
            return{ ...state }
        }
    }
}