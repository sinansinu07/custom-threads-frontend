import axios from 'axios'
import render from "../api/api"
import localhost from "../api/api"


export const startGetDesign = ()=>{
   return async(dispatch)=>{
    try{
        const response = await axios.get(`${render}/api/designs`,{
            headers:{
                'Authorization':localStorage.getItem('token')
            }
        })
        dispatch(getDesign(response.data))
        // console.log(response.data)
    }catch(err){
        console.log(err)
        alert(err)
    }
   }
}

const getDesign=(designs) =>{
    return {
        type:'GET_DESIGNS',
        payload:designs

    }
}

export const startRemoveDesign = (id)=>{
    return async(dispatch)=>{
        try{
            const response = await axios.delete(`${render}/api/designs/${id}`,{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            dispatch(removeDesign(response.data))
            alert('design removed succesfully')
        }catch(err){
            console.log(err)
        }
    }
}
const removeDesign = (design)=>{
    return{
        type:'REMOVE_DESIGN',
        payload:design
    }
}