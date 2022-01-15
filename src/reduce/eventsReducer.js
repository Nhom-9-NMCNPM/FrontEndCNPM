const eventsReducer = (state=[], action)=>{
    switch(action.type){
        case 'START-SET-EVENT':
            return [
                ...action.data,
            ]
        case 'ADD-EVENT':
            return [
                ...state,
                action.data
            ]
        case 'REMOVE-EVENT': 
            return state.filter((item) => item.id!== action.id);
        case 'UPDATE-EVENT':
            return state.map((item) =>{
                if(item.id=== action.id){
                    return {
                        ...item,
                        publish: action.data
                    }
                }else{
                    return item;
                }
            })
        default: return state;
    }
}
export default eventsReducer;