const skirtReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-SKIRT':
            return [
                ...action.data,
            ]
        default: return state;
    }
}
export default skirtReducer;
