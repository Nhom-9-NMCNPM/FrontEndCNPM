import client from '../client/client';
import {startSetWater} from '../actions/water';
import Page404 from '../components/Page404';
import {gql} from '@apollo/client';
const getWater = (dispatch) => {
    client
        .query({
            query: gql`
            query Query {
                getWater {
                    id
                    img
                    name
                    description
                    price
                }
            }
            `
        })
        .then(result => {
            dispatch(startSetWater(result.data.getWater))
        })
        .catch(err =>  <Page404 />)
};
export default getWater;
