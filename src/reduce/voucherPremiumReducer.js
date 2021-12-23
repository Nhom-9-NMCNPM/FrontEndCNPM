const voucherPremiumReducer = (state=[], action) =>{
    switch(action.type){
        case 'START-SET-VOUCHER-PREMIUM':
            return [
                ...action.data,
            ]
        case 'ADD-VOUCHER-PREMIUM':
            return [
                ...state,
                action.data
            ]
        case 'REMOVE-VOUCHER-PREMIUM': 
            return state.filter((item) => item.id!== action.id);
        case 'UPDATE-VOUCHER-PREMIUM':
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
export default voucherPremiumReducer;