import client from '../client/client';
import {gql} from '@apollo/client';
import {startSetShirt} from '../actions/shirt';
const getShirt = (dispatch) => {
    client
        .query({
            query: gql`
            query GetShirt {
                getShirt {
                    id
                    name
                    description
                    img
                    updatedAt
                    createdAt
                    price
                    codePro
                    size_M
                    size_S
                    size_L
                    size_XL
                    material
                    color
                    publish
                    newPro
                }
            }
            `
        })
        .then(result => {
            console.log(result);
            dispatch(startSetShirt(result.data.getShirt))
        })
};
export default getShirt;
