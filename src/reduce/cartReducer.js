
const cartReducer = (state = [], action) =>{
    switch(action.type){
        case 'REST-CART':
            return [];
        case 'ADD-CART':
            const isProExist = state.findIndex((item)=>item.id === action.data.id);
            if(isProExist!==-1){
                if(state[isProExist].size!==action.data.size){
                    return [
                        ...state,
                        action.data
                    ];
                }else{
                    action.data.count+=state[isProExist].count;
                    const a1 = state.slice(0, isProExist);
                    const a2 = state.slice(isProExist + 1, state.length);
                    
                    return [
                        ...a1,
                        action.data,
                        ...a2,
                    ];
                }   
            }else{
                return [
                    ...state,
                    action.data
                ];
            }
            
        case 'REMOVE-CART':
            return state.filter(pro => pro.id!==action.id||pro.size!==action.size);
        default: return [];
    }
}
export default cartReducer;