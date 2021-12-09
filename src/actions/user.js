import { firebase, provider } from '../firebase/firebase';
import {resetCart} from './cart';
import loginUser from '../mutation/loginUser';
export const login = (user) => {
    return {
        type: 'LOGIN',
        user
    }
}
export const startSetLogin = ({name, email}) => {
    return (dispatch) => {
        return loginUser({name, email}, dispatch)
    };
} 
export const startLogin = () => {
    return (dispatch) => {
        return firebase.auth().signInWithPopup(provider);
    }
}
export const logout = () => {
    return {
        type: 'LOGOUT',
    }
}
export const stopLogin = () => {
    return (dispatch) => {
        return firebase.auth().signOut()
    }
}


