import { disableExperimentalFragmentVariables, gql, useQuery } from '@apollo/client';
import { startSetShirt } from '../actions/shirt';
import { startSetSkirt } from '../actions/skirt';
import { startSetTrousers } from '../actions/trousers';
import {startSetDress} from '../actions/dress';
import { startSetVoucher } from '../actions/voucher';
import LoadingPage from '../components/LoadingPage';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { setEvent, startSetEvent } from '../actions/event';
import { startSetVoucherPremium } from '../actions/voucherPremium';
const GET_DATA = gql`
  query GetDress {
  getDress {
    id
    createdAt
    updatedAt
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
    newPro
    publish
  }
  getTrousers {
    id
    createdAt
    updatedAt
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
    newPro
    publish
  }
  getShirt {
    id
    createdAt
    updatedAt
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
  getSkirt {
    id
    createdAt
    updatedAt
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
    newPro
    publish
  }
  getSale{
    disCount
  }
  getVoucher {
    id
    createdAt
    updatedAt
    disCount
    condition
  }
  getVoucherPremium {
    id
    createdAt
    updatedAt
    disCount
    condition
  }
  getSales {
    id
    createdAt
    updatedAt
    disCount
    publish
  }
}
`;

const GetData =({startSetTrousers, startSetDress, startSetSkirt, startSetShirt, startSetVoucher, startSetVoucherPremium, setEvent, startSetEvent}) =>{
    const { loading, error, data } = useQuery(GET_DATA);

    if (loading) return <LoadingPage />;
    if (error) return `Error! ${error}`;
    if(data){
        startSetDress(data.getDress);
        startSetShirt(data.getShirt)
        startSetSkirt(data.getSkirt)
        startSetTrousers(data.getTrousers)
        setEvent(data.getSale.disCount)
        startSetVoucher(data.getVoucher)
        startSetVoucherPremium(data.getVoucherPremium)
        startSetEvent(data.getSales)
    }
    return (
        <LoadingPage />
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        startSetTrousers:(trousers)=> dispatch(startSetTrousers(trousers)),
        startSetDress:(dress)=> dispatch(startSetDress(dress)),
        startSetSkirt:(skirt)=> dispatch(startSetSkirt(skirt)),
        startSetShirt:(shirt)=> dispatch(startSetShirt(shirt)),
        setEvent:(data)=> dispatch(setEvent(data)),
        startSetVoucher:(voucher)=> dispatch(startSetVoucher(voucher)),
        startSetVoucherPremium:(voucher)=> dispatch(startSetVoucherPremium(voucher)),
        startSetEvent:(event) => dispatch(startSetEvent(event))
    }
}
export default connect(null, mapDispatchToProps)(GetData);