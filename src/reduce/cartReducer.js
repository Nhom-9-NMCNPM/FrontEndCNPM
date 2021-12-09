const stateDefault = JSON.parse(window.localStorage.getItem('cartItems')) || [];
const cartReducer = (state = stateDefault, action) =>{
    switch(action.type){
        case 'REST-CART':
            return [];
        case 'ADD-CART':
            const isProExist = state.findIndex((item)=>item.id === action.data.id);
            if(isProExist!==-1){
                if(state[isProExist].size!==action.data.size){
                    window.localStorage.setItem('cartItems', JSON.stringify([
                        ...state,
                        action.data
                    ]));
                    return [
                        ...state,
                        action.data
                    ];
                }else{
                    action.data.count+=state[isProExist].count;
                    const a1 = state.slice(0, isProExist);
                    const a2 = state.slice(isProExist + 1, state.length);
                    window.localStorage.setItem('cartItems', JSON.stringify([
                        ...a1,
                        action.data,
                        ...a2,
                    ]))
                    return [
                        ...a1,
                        action.data,
                        ...a2,
                    ];
                }   
            }else{
                window.localStorage.setItem('cartItems', JSON.stringify([
                    ...state,
                    action.data
                ]))
                return [
                    ...state,
                    action.data
                ];
            }
            
        case 'REMOVE-CART':
            const newState = state.filter(pro => pro.id!==action.id||pro.size!==action.size);
            window.localStorage.setItem('cartItems', JSON.stringify(newState))
            return newState;
        default: return state;
    }
}
export default cartReducer;