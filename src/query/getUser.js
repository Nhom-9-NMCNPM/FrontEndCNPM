import client from '../client/client';
import {gql} from '@apollo/client';
import { startSetUserList } from '../actions/admin';
const getUser = (dispatch) => {
    client
        .query({
            query: gql`
            query Query {
                getUser {
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
            `
        })
        .then(result => {
            dispatch(startSetUserList(result.data.getUser))
        })
};
export default getUser;
