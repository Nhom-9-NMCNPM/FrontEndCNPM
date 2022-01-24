
import client from '../client/client';
import {gql} from '@apollo/client';
import {startSetOrder, updateHistoryOrder} from '../actions/order'
const getOrder = (dispatch) => {
    client
        .query({
            query: gql`
            query GetOrder {
                getOrder {
                    id
                    createdAt
                    updatedAt
                    namePro
                    price
                    status
                    userId
                  }
            }
            `
        })
        .then(result => {
            dispatch(startSetOrder(result.data.getOrder))
            dispatch(updateHistoryOrder(result.data.getOrder))
        })
};
export default getOrder;
