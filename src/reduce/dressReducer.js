const dressReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-DRESS':
            return [
                ...state,
                ...action.data,
            ]
        default: return state;
    }
}
export default dressReducer;
