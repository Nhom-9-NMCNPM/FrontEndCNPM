const trousersReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-TROUSERS':
            return [
                ...action.data,
            ]
        default: return state;
    }
}
export default trousersReducer;
