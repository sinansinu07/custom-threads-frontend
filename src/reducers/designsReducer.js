const initialState = {
    data: [],
    serverErrors:[]
}

export default function designsReducer(state=initialState,action){
    switch(action.type){
        case "GET_DESIGNS":{
            return{...state, data:action.payload}
        }
        case "REMOVE_DESIGN":{
            return { ...state, data : state.data.filter((ele) => {
                return ele._id !== action.payload._id
            })}
        }
        default:{
            return state;
        }
    }
}