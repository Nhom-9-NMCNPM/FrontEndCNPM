import client from '../client/client';
import {gql} from '@apollo/client';
import {startSetTrousers} from '../actions/trousers';
const getTrousers = (dispatch) => {
    client
        .query({
            query: gql`
            query GetTrousers {
                getTrousers {
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
            dispatch(startSetTrousers(result.data.getTrousers))
        })
};
export default getTrousers;
