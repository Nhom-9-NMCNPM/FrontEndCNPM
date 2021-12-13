import {gql} from '@apollo/client';
import client from '../client/client';
import {login, logout} from '../actions/user';
import {history} from '../router/AppRouter'
const loginUser = async ({ name, email}, dispatch) =>{
    const dataUser={
        name,
        email,
        phoneNumber: "", 
        point:0,
        admin: false,
        address: "",
        staff: false,
    };
    await client
            .mutate({
                mutation:  gql`
                    mutation Mutation($data: createUserInput!) {
                        createUser(data: $data) {
                            id
                            email
                            name
                            phoneNumber
                            address
                            point
                            orders {
                            id
                            createdAt
                            updatedAt
                            namePro
                            price
                            status
                            }
                            admin
                            staff
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
                history.push('/');
                return response;
            })
            .catch((response) => {
                dispatch(logout());
                return response;
            })
}
export default loginUser;