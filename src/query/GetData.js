import { gql, useQuery } from '@apollo/client';
import { startSetShirt } from '../actions/shirt';
import { startSetSkirt } from '../actions/skirt';
import { startSetTrousers } from '../actions/trousers';
import {startSetDress} from '../actions/dress';
import LoadingPage from '../components/LoadingPage';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
const GET_DATA = gql`
  query GetDress {
  getDress {
    id
    createdAt
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
}
`;

const GetData = ({startSetTrousers, startSetDress, startSetSkirt, startSetShirt}) =>{
    const { loading, error, data } = useQuery(GET_DATA);

    if (loading) return <LoadingPage />;
    if (error) return `Error! ${error}`;
    if(data){
        console.log(data);
        startSetDress(data.getDress);
        startSetShirt(data.getShirt)
        startSetSkirt(data.getSkirt)
        startSetTrousers(data.getTrousers)
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
    }
}
export default connect(null, mapDispatchToProps)(GetData);