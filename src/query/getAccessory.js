import client from '../client/client';
import {gql} from '@apollo/client';
import {startSetAccessory} from '../actions/accessory';
const getAccessory = (dispatch) => {
    client
        .query({
            query: gql`
            query GetAccessory {
                getAccessory {
                    id
                    name
                    description
                    img
                    updatedAt
                    createdAt
                    price
                    codePro
                    count
                    material
                    color
                    publish
                    newPro
                }
            }
            `
        })
        .then(result => {
            dispatch(startSetAccessory(result.data.getAccessory))
        })
};
export default getAccessory;
