
const userDefault={
    name:'client',
    email:'',
    phoneNumber: "", 
    point:0,
    admin: false,
    address: "",
    staff: false,
    orders:[]
}
const userReducer = (state=userDefault, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                ...action.user
            }
        case 'LOGOUT':
            return userDefault;
        case 'CANCEL':
            const stateOrder = state.orders.map((order) => {
                if(order.id===action.id){
                    return {
                        ...order,
                        status:"Hủy đơn hàng"
                    }
                }else{
                    return order
                }
            })
            return {
                ...state,
                orders: stateOrder
            }
        case 'ORDER':
            const stateOrder1 = [
                ...state.orders,
                action.data
            ]
            return {
                ...state,
                orders: stateOrder1
            }
        default: return state;
    }
}
export default userReducer;