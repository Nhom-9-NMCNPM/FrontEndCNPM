const skirtReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-SKIRT':
            return [
                ...action.data,
            ]
        case 'ADD-SKIRT':
            return [
                ...state,
                action.data
            ]
        case 'REMOVE-SKIRT': 
            return state.filter((item) => item.id!== action.id);
        case 'UPDATE-SKIRT':
            return state.map((item) =>{
                if(item.id===action.id){
                    return {
                        ...item,
                        ...action.skirt,
                    }
                }else{
                    return item;
                }
            })
        default: return state;
    }
}
export default skirtReducer;
