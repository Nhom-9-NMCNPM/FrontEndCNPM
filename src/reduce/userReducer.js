
const userDefault={
    name:'client',
    email:'',
    phoneNumber: "", 
    point:0,
    admin: false,
    address: "",
    staff: false,
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
        default: return state;
    }
}
export default userReducer;