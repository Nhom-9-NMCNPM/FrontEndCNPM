import client from '../client/client';
import {gql} from '@apollo/client';
import {startSetSkirt} from '../actions/skirt';
const getSkirt = (dispatch) => {
    client
        .query({
            query: gql`
            query GetSkirt {
                getSkirt {
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
            dispatch(startSetSkirt(result.data.getSkirt))
        })
};
export default getSkirt;
