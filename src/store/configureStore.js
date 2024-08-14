import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"

import addressesReducers from "../reducers/addressesReducers"
import categoriesReducers from "../reducers/categoriesReducers"
import productsReducers from "../reducers/productsReducers"
import designsReducer from "../reducers/designsReducer"
import cartReducers from "../reducers/cartReducer"
import ordersReducers from "../reducers/ordersReducers"

const configureStore = () => {
    const store = createStore(combineReducers({
        addresses : addressesReducers,
        categories: categoriesReducers,
        products:productsReducers,
        designs:designsReducer,
        cart:cartReducers,
        orders: ordersReducers
    }), applyMiddleware(thunk))

    return store
}

export default configureStore