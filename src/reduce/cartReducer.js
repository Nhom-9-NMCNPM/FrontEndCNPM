const stateDefault = JSON.parse(window.localStorage.getItem('cartItems')) || [];
const cartReducer = (state = stateDefault, action) =>{
    switch(action.type){
        case 'RESET-CART':
            window.localStorage.setItem('cartItems', JSON.stringify([]));
            return [];
        case 'ADD-CART':
            const isProExist = state.findIndex((item)=>item.id === action.data.id && item.size ===action.data.size);
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
        case "CHANGE-QUANTITY":
            const index = state.findIndex(
                (item) => item.id === action.id && item.size === action.size
            );

            state[index].count = action.quantity;

            return [...state];
        case 'REMOVE-CART':
            const newState = state.filter(pro => pro.id!==action.id||pro.size!==action.size);
            window.localStorage.setItem('cartItems', JSON.stringify(newState))
            return newState;
        default: return state;
    }
}
export default cartReducer;