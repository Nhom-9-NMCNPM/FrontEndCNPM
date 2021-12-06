import { useMutation, gql } from "@apollo/client";
import NavHeader from "../HomePage/NavHeader";
import {useState} from "react";
import {connect} from "react-redux";
import "../../style/User/OrderListUser.css";
const UPDATE = gql`
        mutation Mutation($data: updateOrderInput!, $updateOrderId: Int!) {
            updateOrder(data: $data, id: $updateOrderId) {
            id
            }
        }
`

const OrderListUser = ({user}) => {
    const [showDelivered, setShowDelivered] = useState(true)
    const [showDelivering, setShowDelivering] = useState(false)
    const [showPending, setShowPending] = useState(false)
    const [showCanceled, setShowCanceled] = useState(false)
    
    const stateOrder = ['Đã giao hàng', 'Đang giao hàng', 'Chờ xử lý', 'Hủy đơn hàng']
    const [stateCurrent , setStateCurrent] = useState(stateOrder[0]) 
    const [valueState, setValueState] = useState({delivered: stateOrder[0],delivering:stateOrder[1], pending: stateOrder[2], canceled: stateOrder[3]})
    const orderCurrent = user.orders.filter((item) => {
        return item.status === stateCurrent
    })
    const [updateOrder, {loading, error, data}] = useMutation(UPDATE, {
        onCompleted: (data) => {
            alert("Cập nhật thành công")
            updateHistoryOrder(data.updateOrder.id, {status: data.updateOrder.status}) 
            window.location.reload()
            
        }
    })
    const handleShowDelivered = () => {
        setShowDelivered(true)
        setShowDelivering(false)
        setShowPending(false)
        setShowCanceled(false)
        setStateCurrent(stateOrder[0])
    }
    const handleShowDelivering = () => {
        setShowDelivered(false)
        setShowDelivering(true)
        setShowPending(false)
        setShowCanceled(false)
        setStateCurrent(stateOrder[1])
    }
    const handleShowPending = () => {
        setShowDelivered(false)
        setShowDelivering(false)
        setShowPending(true)
        setShowCanceled(false)
        setStateCurrent(stateOrder[2])
    }
    const handleShowCanceled = () => {
        setShowDelivered(false)
        setShowDelivering(false)
        setShowPending(false)
        setShowCanceled(true)
        setStateCurrent(stateOrder[3])
    }
    const handleChangeState = (item, status) => {
        updateOrder({
            variables: {
                updateOrderId: item.id,
                data: {
                    status
                }
            }
        })
    }
    return (
        <div>
            <NavHeader />
            <div className="margin-bottom">
                <div className="table-title-revenue">
                    <h2>ĐƠN HÀNG</h2>
                    <button type="button" className="btn btn-outline-secondary btn-margin-left" onClick={handleShowDelivered}>Đơn hàng đã giao</button>
                    <button type="button" className="btn btn-outline-secondary btn-center" onClick={handleShowDelivering}>Đơn hàng đang giao</button>
                    <button type="button" className="btn btn-outline-secondary btn-center" onClick={handleShowPending}>Đơn hàng đang chờ xử lý</button>
                    <button type="button" className="btn btn-outline-secondary btn-margin-right" onClick={handleShowCanceled}>Đơn hàng đã hủy</button>
                </div>
                
                <div className="table-product table-revenue">

                {showDelivered && <table className="table">
                    <thead>
                        <tr className="table-tr">
                        <th scope="col" style={{width: '1%'}} >STT</th>
                        <th scope="col"style={{width: '4%'}}>ID</th>
                        <th scope="col"className="table-50">ĐƠN HÀNG</th>
                        <th scope="col"style={{width: '10%'}}>GIÁ</th>
                        <th scope="col"style={{width: '15%'}}>NGÀY TẠO</th>
                        <th scope="col"style={{width: '15%'}}>NGÀY CẬP NHẬT</th>
                        </tr>
                    </thead>
                    {orderCurrent.length > 0  ?  
                    <tbody className="table-body">  
                        {orderCurrent.map((item,index) => {
                             var createdAt = new Date(parseFloat(item.createdAt));
                             var updatedAt = new Date(parseFloat(item.updatedAt));
                            return  (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.namePro.join(' ; ')}</td>
                                    <td>{item.price}</td>
                                    <td>{createdAt.toLocaleString()}</td>
                                    <td>{updatedAt.toLocaleString()}</td>
                                </tr>
                            )
                            })}
                    </tbody>  
                    
                    : <span className="no-data">Không có dữ liệu</span>
                               
                        }
                </table>}
                {showDelivering && <table className="table">
                    <thead>
                        <tr className="table-tr">
                        <th scope="col" style={{width: '1%'}}>STT</th>
                        <th scope="col"style={{width: '5%'}}>ID</th>
                        <th scope="col" className="table-50">ĐƠN HÀNG</th>
                        <th scope="col"style={{width: '5%'}}>GIÁ</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY TẠO</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY CẬP NHẬT</th>
                        <th scope="col"style={{width: '10%'}}>TRẠNG THÁI</th>
                        </tr>
                    </thead>
                    {orderCurrent.length > 0 ? <tbody className="table-body">  
                        {orderCurrent.map((item,index) => {
                                var createdAt = new Date(parseFloat(item.createdAt));
                                var updatedAt = new Date(parseFloat(item.updatedAt));
                                return (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{item.id}</td>
                                        <td>{item.namePro.join(' ; ')}</td>
                                        <td>{item.price}</td>
                                        <td>{createdAt.toLocaleString()}</td>
                                        <td>{updatedAt.toLocaleString()}</td>
                                        <td>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>  : <span className="no-data">Không có dữ liệu</span>}
                    
                </table>}
                {showPending && <table className="table">
                    <thead>
                        <tr className="table-tr">
                        <th scope="col" style={{width: '1%'}}>STT</th>
                        <th scope="col"style={{width: '5%'}}>ID</th>
                        <th scope="col" className="table-50">ĐƠN HÀNG</th>
                        <th scope="col"style={{width: '5%'}}>GIÁ</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY TẠO</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY CẬP NHẬT</th>
                        <th scope="col"style={{width: '10%'}}>TRẠNG THÁI</th>
                        </tr>
                    </thead>
                    {orderCurrent.length > 0 ?   <tbody className="table-body">  
                        {orderCurrent.map((item,index) => {
                             var createdAt = new Date(parseFloat(item.createdAt));
                             var updatedAt = new Date(parseFloat(item.updatedAt));
                             return (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.namePro.join(' ; ')}</td>
                                    <td>{item.price}</td>
                                    <td>{createdAt.toLocaleString()}</td>
                                    <td>{updatedAt.toLocaleString()}</td>
                                    <td><select className="form-select  mb-3 select-option-status" value={stateOrder[2]} onChange={(e) => handleChangeState(item,e.target.value)}>
                                        <option value={stateOrder[2]} key={index} >{stateOrder[2]}</option>
                                        <option value={stateOrder[3]} key={index} >{stateOrder[3]}</option>
                                        </select>
                                    </td>
                                </tr>
                            )
                        }) }
                    </tbody> : <span className="no-data">Không có dữ liệu</span>}
                  
                </table>}
                {showCanceled && <table className="table">
                    <thead>
                        <tr className="table-tr">
                        <th scope="col" style={{width: '1%'}}>STT</th>
                        <th scope="col"style={{width: '5%'}}>ID</th>
                        <th scope="col" className="table-50">ĐƠN HÀNG</th>
                        <th scope="col"style={{width: '5%'}}>GIÁ</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY TẠO</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY CẬP NHẬT</th>
                        <th scope="col"style={{width: '10%'}}>TRẠNG THÁI</th>
                        </tr>
                    </thead>
                    {orderCurrent.length > 0 ? <tbody className="table-body">
                        {orderCurrent.map((item,index) => {
                             var createdAt = new Date(parseFloat(item.createdAt));
                             var updatedAt = new Date(parseFloat(item.updatedAt));
                             return (
                                <tr>
                                    <th scope="row" key={index}>{index + 1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.namePro.join(' ; ')}</td>
                                    <td>{item.price}</td>
                                    <td>{createdAt.toLocaleString()}</td>
                                    <td>{updatedAt.toLocaleString()}</td>
                                    <td>
                                    </td>
                                </tr>
                            )
                        }) }  
                    </tbody> : <span className="no-data">Không có dữ liệu</span>}
                    
                </table>}
                </div>
            </div>
        </div>
        
    )
}
const mapStateToProps = (state)  => {
    return {
        user: state.User
    }
}


export default connect(mapStateToProps)(OrderListUser);
