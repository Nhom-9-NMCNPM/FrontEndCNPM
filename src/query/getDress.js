


import client from '../client/client';
import {gql} from '@apollo/client';
import {startSetDress} from '../actions/dress';
const getDress = (dispatch) => {
    client
        .query({
            query: gql`
            query GetDress {
                getDress {
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
            dispatch(startSetDress(result.data.getDress))
        })
};
export default getDress;
