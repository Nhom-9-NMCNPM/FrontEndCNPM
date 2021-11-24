const trousersReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-TROUSERS':
            return [
                ...action.data,
            ]
        case 'ADD-TROUSERS':
            return [
                ...state,
                action.data
            ]
        case 'REMOVE-TROUSERS': 
            return state.filter((item) => item.id!== action.id);
        case 'UPDATE-TROUSERS':
            return state.map((item) =>{
                if(item.id===action.id){
                    return {
                        ...item,
                        ...action.trousers,
                    }
                }else{
                    return item;
                }
            })
        default: return state;
    }
}
export default trousersReducer;
