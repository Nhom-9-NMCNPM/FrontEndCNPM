import client from '../client/client';
import {startSetCombo} from '../actions/combo';
import Page404 from '../components/Page404';
import {gql} from '@apollo/client';
const getCombo = (dispatch) => {
    client
        .query({
            query: gql`
            query Query {
                getCombo {
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
            dispatch(startSetCombo(result.data.getCombo))
        })
        .catch(err =>  <Page404 />)
};
export default getCombo;
