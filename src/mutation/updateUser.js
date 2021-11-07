import client from "../client/client";
import {gql} from '@apollo/client';
const updateUser = (newUser, email) =>{
    client.mutate({
        mutation: gql `
            mutation Mutation($data: updateUserInput!, $email: String!) {
                updateUser(data: $data, email: $email) {
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
        variables: {
            data: newUser,
            email: email
        }
    }).then(response => true)
    .catch(err => false);
}
export default updateUser; 