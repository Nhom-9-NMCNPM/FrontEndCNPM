const orderReducer = (state=[], action) => {
    switch (action.type) {
        case 'START-SET-ORDER' :
            return [
                ...action.data,
            ]
        case 'UPDATE-HISTORY-ORDER' :
            return state.map((item) =>{
                if(item.id===action.id){
                    return {
                        ...item,
                        ...action.data,
                    }
                }else{
                    return item;
                }
            })
        default: return state
    }
}
export default orderReducer