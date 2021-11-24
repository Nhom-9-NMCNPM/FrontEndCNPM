const dressReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-DRESS':
            return [
                ...state,
                ...action.data,
            ]
        case 'ADD-DRESS':
            return [
                ...state,
                action.data
            ]
        case 'REMOVE-DRESS': 
            return state.filter((item) => item.id!== action.id);
        case 'UPDATE-DRESS':
            return state.map((item) =>{
                if(item.id===action.id){
                    return {
                        ...item,
                        ...action.dress,
                    }
                }else{
                    return item;
                }
            })
        default: return state;
    }
}
export default dressReducer;
