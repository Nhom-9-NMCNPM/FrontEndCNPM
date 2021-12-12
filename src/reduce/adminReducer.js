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
        case 'UPDATE-USER-LIST':
            return state.map(item => {
                if(item.id===action.id){
                    return {
                        ...item,
                        ...action.data
                    }
                }else{
                    return item
                }
            })
        case 'DELETE-USER-LIST':
            return state.filter(item => item.id!==action.id)
            
        default: return state;
    }
}
export default adminReducer;