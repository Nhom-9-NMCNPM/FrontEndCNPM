const trouserReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-TROUSER':
            return [
                ...action.data,
            ]
        default: return state;
    }
}
export default trouserReducer;
