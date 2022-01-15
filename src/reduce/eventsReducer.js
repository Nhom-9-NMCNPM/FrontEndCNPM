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
        default: return state;
    }
}
export default eventsReducer;