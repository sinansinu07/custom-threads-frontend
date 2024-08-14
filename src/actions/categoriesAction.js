import {useNavigate} from 'react-router-dom'
import axios from 'axios'
export const startGetCategory = ()=>{
    return async(dispatch)=>{
        try{
            const response = await axios.get("http://localhost:5000/api/categories",{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            })
            dispatch(getCategory(response.data))
            // console.log(response.data)
        }catch(err){
            alert(err)
            console.log(err)
        }
    }
}

const getCategory = (category)=>{
    return {
        type:"GET_CATEGORY",
        payload:category
    }
}
export const startCreateCategory = (formData,navigate)=>{
    return async (dispatch)=>{
        try{
            const response = await axios.post("http://localhost:5000/api/categories",formData,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            })
            dispatch(createCategory(response.data))
            navigate('/manage-category')
            alert('succesfully created category')
            console.log(response.data)
        }catch(err){
            alert(err)
            console.log(err)
        }
    }
}
const createCategory = (category)=>{
    return {
        type:"CREATE_CATEGORY",
        payload: category
    }
}

export const startDeleteCategory = (id)=>{
    return async (dispatch)=>{
        try{
            const response = await axios.delete(`http://localhost:5000/api/categories/${id}`,{
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            dispatch(deleteCategory(response.data))
            alert('successfully deleted')
            console.log(response.data)
        }catch(err){
            console.log(err);
            alert(err)
        }
    }
}
const deleteCategory = (category)=>{
    return{
        type:"DELETE_CATEGORY",
        payload:category
    }
}

export const startUpdateCategory = (formData,id,toggle)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.put(`http://localhost:5000/api/categories/${id}`,formData,{
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            })
            dispatch(updateCategory(response.data));
            toggle()
            alert("Successfully updated!");
        }catch(err){
            alert(err)
            console.log(err)
        }
    }
}
const updateCategory = (category)=>{
    return{
        type:'UPDATE_CATEGORY',
        payload:category
    }
}