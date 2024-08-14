import axios from 'axios'
export const startGetDesign = ()=>{
   return async(dispatch)=>{
    try{
        const response = await axios.get('http://localhost:5000/api/designs',{
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
            const response = await axios.delete(`http://localhost:5000/api/designs/${id}`,{
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