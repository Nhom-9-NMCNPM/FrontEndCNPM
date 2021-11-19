const shirtReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-SHIRT':
            return [
                ...action.data,
            ]
        case 'ADD-SHIRT':
            return [
                ...state,
                action.data
            ]
        default: return state;
    }
}
export default shirtReducer;
