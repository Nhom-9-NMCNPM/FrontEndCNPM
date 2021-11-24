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
        case 'REMOVE-SHIRT': 
            return state.filter((item) => item.id!== action.id);
        case 'UPDATE-SHIRT':
            return state.map((item) =>{
                if(item.id===action.id){
                    return {
                        ...item,
                        ...action.shirt,
                    }
                }else{
                    return item;
                }
            })
        default: return state;
    }
}
export default shirtReducer;
