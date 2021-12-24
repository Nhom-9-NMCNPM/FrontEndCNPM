const eventReducer = (state=0, action)=>{
    switch(action.type){
        case 'SET-EVENT':
            return action.data
        // case 'CREATE-EVENT':
        //     return [
        //         ...state,
        //         action.data
        //     ]
        // case 'UPDATE-EVENT':
        //     return state.map((item)=>{
        //         if(item.id === action.id){
        //             return {
        //                 ...item,
        //                 ...action.data
        //             }
        //         }else{
        //             return item;
        //         }
        //     })
        default: return state;
    }
}
export default eventReducer;