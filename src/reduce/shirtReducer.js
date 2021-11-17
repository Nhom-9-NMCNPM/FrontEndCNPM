const shirtReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-SHIRT':
            return [
                ...action.data,
            ]
        default: return state;
    }
}
export default shirtReducer;
