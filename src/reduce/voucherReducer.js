const voucherReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-VOUCHER':
            return [
                ...action.data,
            ]
        case 'ADD-VOUCHER':
            return [
                ...state,
                action.data
            ]
        case 'REMOVE-VOUCHER': 
            return state.filter((item) => item.id!== action.id);
        case 'UPDATE-VOUCHER':
            return state.map((item) =>{
                if(item.id===action.id){
                    return {
                        ...item,
                        ...action.voucher,
                    }
                }else{
                    return item;
                }
            })
        default: return state;
    }
}
export default voucherReducer;