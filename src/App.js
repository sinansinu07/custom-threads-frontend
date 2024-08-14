import './App.css';

import { Routes, Route } from "react-router-dom"
import { useEffect } from 'react';
import axios from 'axios';

import { useAuth } from './context/AuthContext';
import { useDispatch } from 'react-redux';

import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import VerifyNumber from './components/VerifyNumber';
import PrivateRoutes from './components/PrivateRoutes';
import UnAuthorized from './components/UnAuthorized';

import AdminContainer from './components/admin/AdminContainer';
import ManageOrders from './components/admin/manageOrders';
import ManageCategory from './components/admin/manageCategory';
import CreateCategory from './components/admin/createCategory';

import { startGetCategory } from './actions/categoriesAction';
import { startGetAddresses } from './actions/addressesAction';
import { startGetDesign } from './actions/designsAction';
import { startGetMyCart } from './actions/cartAction';
import { startGetMyOrders } from './actions/ordersAction';

import ManageProduct from './components/admin/manageProduct';
import CreateProduct from './components/admin/createProduct'
import ShowProduct from './components/admin/showProduct';

// Customer Components
import CustomerAccount from './components/customer/CustomerAccount'
import CustomerAddresses from './components/customer/CustomerAddresses'
import CustomerContainer from './components/customer/CustomerContainer'
import CustomerProfile from './components/customer/CustomerProfile'
import CustomerOrders from './components/customer/CustomerOrders'

// import CreateDesign from './components/customer/createDesign';
import SelectProduct from './components/customer/selectProduct';
import CreateDesignOne from './components/customer/createDesignOne';

import NavBar from './components/NavBar';
import ForgotPassword from './components/ForgotPassword';

import CartContainer from './components/cart/cartContainer'

function App() {

  const dispatch = useDispatch()

  const { user, handleLogin } = useAuth()

  useEffect(() => {
    if(localStorage.getItem("token")) {
        (async () => {
            const response = await axios.get("http://localhost:5000/api/user/account", {
                headers : {
                    "Authorization" : localStorage.getItem("token")
                }
            })
            handleLogin(response.data)
        }) ()
    }
}, [])

useEffect(() => {
  if(localStorage.getItem("token") && user && user.role ==='customer'){
    dispatch(startGetAddresses())
    dispatch(startGetDesign())
    dispatch(startGetMyCart())
    dispatch(startGetMyOrders())
  }
  else{
    dispatch(startGetCategory())
  }
},[dispatch, user])

  return (
    <div className="App">
        <Routes>
          {/* <Home /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<UnAuthorized />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/admin-container" element={
          <PrivateRoutes permittedRoles={["admin"]}>
            <AdminContainer />
          </PrivateRoutes>} />
          <Route path="/manage-orders" element={
            <PrivateRoutes permittedRoles={["admin"]}>
            <ManageOrders/>
          </PrivateRoutes>}/>
          <Route path="/manage-category" element={
            <PrivateRoutes permittedRoles={["admin"]}>
            <ManageCategory/>
          </PrivateRoutes>}/>
          <Route path="/create-category" element={
            <PrivateRoutes permittedRoles={["admin"]}>
            <CreateCategory/>
          </PrivateRoutes>}/>
          <Route path="/manage-product/:categoryId" element={
            <PrivateRoutes permittedRoles={["admin"]}>
            <ManageProduct/>
          </PrivateRoutes>}/>
          <Route path="/create-product/:categoryId" element={
            <PrivateRoutes permittedRoles={["admin"]}>
            <CreateProduct/>
          </PrivateRoutes>}/>
          <Route path="/show-product/:categoryId/:productId" element={
            <PrivateRoutes permittedRoles={["admin"]}>
            <ShowProduct/>
          </PrivateRoutes>}/>


          <Route path="/nav-bar" element={
          <PrivateRoutes permittedRoles={["customer"]}>
            <NavBar />
          </PrivateRoutes>} />
          <Route path="/customer-container" element={
          <PrivateRoutes permittedRoles={["customer"]}>
            <CustomerContainer />
          </PrivateRoutes>} />

          <Route path="/select-product/:categoryId" element={
            <PrivateRoutes permittedRoles={["customer"]}>
            <SelectProduct/>
          </PrivateRoutes>}/>
          <Route path="/create-design/:categoryId/:productId" element={
            <PrivateRoutes permittedRoles={["customer"]}>
            <CreateDesignOne/>
          </PrivateRoutes>}/>

          <Route path="/verify-number" element={
          <PrivateRoutes permittedRoles={["customer"]}>
            <VerifyNumber />
          </PrivateRoutes>} />
          <Route path="/customer-profile" element={
            <PrivateRoutes permittedRoles={["customer"]}>
            <CustomerProfile />
          </PrivateRoutes>} />
          <Route path="/customer-addresses" element={
            <PrivateRoutes permittedRoles={["customer"]}>
            <CustomerAddresses />
          </PrivateRoutes>} />
          <Route path="/customer-account" element={
            <PrivateRoutes permittedRoles={["customer"]}>
            <CustomerAccount />
          </PrivateRoutes>} />
          <Route path="/cart" element={
            <PrivateRoutes permittedRoles={["customer"]}>
            <CartContainer />
          </PrivateRoutes>} />
          <Route path="/customer-orders" element={
            <PrivateRoutes permittedRoles={["customer"]}>
            <CustomerOrders />
          </PrivateRoutes>} />
        </Routes>
    </div>
  );
}

export default App;
