import client from '../client/client';
import {gql} from '@apollo/client';
import {startSetVoucher} from '../actions/voucher';
const getVoucher = (dispatch) => {
    client
        .query({
            query: gql`
            query GetVoucher {
                getVoucher {
                    id
                    createdAt
                    updatedAt
                    disCount
                    condition
                }
            }
            `
        })
        .then(result => {
            console.log(result);
            dispatch(startSetVoucher(result.data.getVoucher))
        })
};
export default getVoucher;
