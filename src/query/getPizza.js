import client from '../client/client';
import {startSetPizza} from '../actions/pizza';
import Page404 from '../components/Page404';
import {gql} from '@apollo/client';
const getPizza = (dispatch) => {
    client
        .query({
            query: gql`
            query Query {
                getPizza {
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
            dispatch(startSetPizza(result.data.getPizza))
        })
        .catch(err =>  <Page404 />)
};
export default getPizza;
