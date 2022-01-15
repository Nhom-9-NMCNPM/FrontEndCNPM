const accessoryReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-ACCESSORY':
            return [
                ...state,
                ...action.data,
            ]
        case 'ADD-ACCESSORY':
            return [
                ...state,
                action.data
            ]
        case 'REMOVE-ACCESSORY': 
            return state.filter((item) => item.id!== action.id);
        case 'UPDATE-ACCESSORY':
            return state.map((item) =>{
                if(item.id===action.id){
                    return {
                        ...item,
                        ...action.accessory,
                    }
                }else{
                    return item;
                }
            })
        default: return state;
    }
}
export default accessoryReducer;
