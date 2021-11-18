import client from '../client/client';
import {gql} from '@apollo/client';
import {startSetTrouser} from '../actions/trouser';
const getTrouser = (dispatch) => {
    client
        .query({
            query: gql`
            query GetTrouser {
                getTrouser {
                    id
                    name
                    description
                    img
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
            dispatch(startSetTrouser(result.data.getTrouser))
        })
};
export default getTrouser;
