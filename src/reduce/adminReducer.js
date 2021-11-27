const adminReducer = (state=[], action) =>{
    switch(action.type){
        case 'SET-USER-LIST':
            return [
                ...action.data,
            ]
        case 'ADD-USER-LIST':
            return [
                ...state,
                action.data,
            ]
            
        default: return state;
    }
}
export default adminReducer;