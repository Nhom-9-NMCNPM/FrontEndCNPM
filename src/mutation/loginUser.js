import {gql} from '@apollo/client';
import client from '../client/client';
import {login, logout} from '../actions/user';
const loginUser = async ({uid, name, email}, dispatch) =>{
    const dataUser={
        uid,
        name,
        email,
        phoneNumber: "", 
        point:0,
        admin: false,
        address: "",
    };
    await client
            .mutate({
                mutation:  gql`
                    mutation Mutation($data: createUserInput!) {
                        createUser(data: $data) {
                            id
                            uid
                            email
                            name
                            phoneNumber
                            address
                            point
                            admin
                        }
                    }
                `,
                variables:{
                    data: dataUser
                }
            })
            .then((response) => {
                const user = response.data.createUser;
                dispatch(login(user));
                return response;
            })
            .catch((response) => {
                dispatch(logout());
                return response;
            })
}
export default loginUser;