import axios from "axios";
const render = process.env.RENDER_LINK
const localhost = process.env.LOCALHOST_LINK

export const startCreateProduct = (formData,categoryId,navigate)=>{
    console.log(formData)
    return async(dispatch)=>{
        try {
            const response = await axios.post(`${render}/api/products/${categoryId}`,formData,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            })
            dispatch(createProduct(response.data))
            alert('succesfully created product')
            navigate(`/manage-product/${categoryId}`)
            console.log(response.data)
        }catch(err){
            alert(err)
            console.log(err)
        }
    }
}
const createProduct = (product)=>{
    return {
        type:'CREATE_PRODUCT',
        payload : product
    }
}

export const startGetCategoryProducts = (categoryId)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get(`${render}/api/products/${categoryId}`,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            })
            dispatch(getCategoryProduct(response.data))
        }catch(err){
            console.log(err);
            alert(err)
        }
    }
}
const getCategoryProduct=(product)=>{
    return{
        type:"GET_PRODUCT",
        payload:product
    }
}

export const startDeleteProduct = (id)=>{
    return async (dispatch)=>{
        try{
            const response = await axios.delete(`${render}/api/products/${id}`,{
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            dispatch(deleteProduct(response.data))
            alert('successfully deleted')
            console.log(response.data)
        }catch(err){
            console.log(err);
            alert(err)
        }
    }
}
const deleteProduct = (product)=>{
    return{
        type:"DELETE_PRODUCT",
        payload:product
    }
}

export const startUpdateProduct = (formData,categoryId,id,toggle)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.put(`${render}/api/products/${categoryId}/${id}`,formData,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            })
            dispatch(updateProduct(response.data));
            toggle()
            alert("Successfully updated!");
        }catch(err){
            alert(err)
            console.log(err)
        }
    }
}
const updateProduct = (product)=>{
    return{
        type:'UPDATE_PRODUCT',
        payload:product
    }
}