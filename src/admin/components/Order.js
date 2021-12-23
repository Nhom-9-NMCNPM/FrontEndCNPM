import NavHeader from "../../components/HomePage/NavHeader"
import { connect } from "react-redux"
import { useState } from "react";
import format_curency from "../../utils/displayPrice";
import { useMutation, gql } from "@apollo/client";
import LoadingPage from "../../components/LoadingPage";
import { Redirect } from "react-router";
import { updateHistoryOrder } from "../../actions/order";
import { showSuccessToast } from "../../utils/displayToastMess";
const UPDATE = gql`
        mutation Mutation($data: updateOrderInput!, $updateOrderId: Int!) {
            updateOrder(data: $data, id: $updateOrderId) {
            id
            status
            }
        }
`

const Order = ({order, updateHistoryOrder}) => {
    const [showDelivered, setShowDelivered] = useState(true)
    const [showDelivering, setShowDelivering] = useState(false)
    const [showPending, setShowPending] = useState(false)
    const [showCanceled, setShowCanceled] = useState(false)
    const [updateOrder, {loading, error, data}] = useMutation(UPDATE, {
        onCompleted: (data) => {
            updateHistoryOrder(data.updateOrder.id, {status: data.updateOrder.status}) 
            showSuccessToast("Cập nhật thành công")
        }
    })
    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    let isDisable = false
    const stateOrder = ['Đã giao hàng', 'Đang giao hàng', 'Chờ xử lý', 'Hủy đơn hàng']
    const [stateCurrent , setStateCurrent] = useState(stateOrder[0]) 
    const monthCurrent = new Date().getMonth() + 1
    const yearCurrent = new Date().getFullYear()
    const [valueState, setValueState] = useState({delivered: stateOrder[0],delivering:stateOrder[1], pending: stateOrder[2], canceled: stateOrder[3], month: monthCurrent, year: yearCurrent})
    const orderCurrent = order.filter((item) => {
        return item.status === stateCurrent && new Date(parseFloat(item.createdAt)).getMonth() + 1  === parseInt(valueState.month) && new Date(parseFloat(item.createdAt)).getFullYear()   === parseInt(valueState.year)
    })
    console.log(valueState.year);
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
  
    if(loading) {
        return <LoadingPage />
    }
    if(error) {
        alert("Có lỗi xảy ra, vui lòng thử lại");
        <Redirect to="/admin-order" />
      }
    return (
        <div>
            <NavHeader showOrder={true} />
            <div className="margin-bottom">
                <div className="table-title-revenue">
                    <h1>ĐƠN HÀNG</h1>
                    <button type="button" className={`btn btn-outline-secondary ${showDelivered && "active"} btn-margin-left`} onClick={handleShowDelivered}>Đơn hàng đã giao</button>
                    <button type="button" className={`btn btn-outline-secondary ${showDelivering && "active"} btn-center`} onClick={handleShowDelivering}>Đơn hàng đang giao</button>
                    <button type="button" className={`btn btn-outline-secondary ${showPending && "active"} btn-center`} onClick={handleShowPending}>Đơn hàng đang chờ xử lý</button>
                    <button type="button" className={`btn btn-outline-secondary ${showCanceled && "active"} btn-margin-right`} onClick={handleShowCanceled}>Đơn hàng đã hủy</button>
                </div>
                <div className="revenue">
                  {showDelivered &&  <h3 className="title-revenue">Doanh thu tháng</h3> }
                  {showDelivering &&  <h3 className="title-revenue">Đơn hàng tháng</h3> }
                  {showPending &&  <h3 className="title-revenue">Đơn hàng tháng</h3> }
                  {showCanceled &&  <h3 className="title-revenue">Đơn hàng tháng</h3> }
                    <select className="form-select  mb-3 select-option" value={valueState.month} onChange={(e) => {setValueState({...valueState, month: e.target.value})}} >
                      {months.map((month,index) => {
                          return (
                              
                                <option value={`${month}`} key={index}>{month}</option> 
                          )
                      })}
                    </select>
                    <select className="form-select  mb-3 select-option" value={valueState.year} onChange={(e) => {setValueState({...valueState, year: e.target.value})}}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                    {showDelivered && 
                    <div style={{display: 'flex'}}>
                        <h3 style={{padding: '0 4px'}}> : </h3>
                        <h3 className="revenue-money">{format_curency(orderCurrent.reduce((total,num) => {
                            let time = new Date(parseFloat(num.createdAt))
                            return  (time.getMonth() + 1) === Number(valueState.month) && (num.status === "Đã giao hàng") ?  (parseInt(parseInt(num.price) + total)) : (total)
                        }, 0))}đ</h3>  
                    </div>} 
                </div>
                <div className="table-product table-revenue">

               
                {showDelivered && <table className="table">
                    <thead>
                        <tr className="table-tr">
                        <th scope="col" style={{width: '1%', borderRadius: '10px'}} >STT</th>
                        <th scope="col"style={{width: '4%'}}>ID</th>
                        <th scope="col"className="table-50">ĐƠN HÀNG</th>
                        <th scope="col"style={{width: '10%'}}>GIÁ</th>
                        <th scope="col"style={{width: '15%'}}>NGÀY TẠO</th>
                        <th scope="col"style={{width: '15%', borderRadius: '10px'}}>NGÀY CẬP NHẬT</th>
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
                                    <td>{format_curency(item.price)}đ</td>
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
                        <th scope="col" style={{width: '1%', borderRadius: '10px'}}>STT</th>
                        <th scope="col"style={{width: '5%'}}>ID</th>
                        <th scope="col" className="table-50">ĐƠN HÀNG</th>
                        <th scope="col"style={{width: '5%'}}>GIÁ</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY TẠO</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY CẬP NHẬT</th>
                        <th scope="col"style={{width: '10%', borderRadius: '10px'}}>TRẠNG THÁI</th>
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
                                        <td>{format_curency(item.price)}đ</td>
                                        <td>{createdAt.toLocaleString()}</td>
                                        <td>{updatedAt.toLocaleString()}</td>
                                        <td><select className="form-select  mb-3 select-option-status" value={stateOrder[1]} onChange={(e) => handleChangeState(item,e.target.value)}>
                                            
                                            <option value={stateOrder[0]} key={index} disabled={isDisable}>{stateOrder[0]}</option>
                                            <option value={stateOrder[1]} key={index} disabled={isDisable}>{stateOrder[1]}</option>
                                            <option value={stateOrder[2]} key={index} disabled={!isDisable}>{stateOrder[2]}</option>
                                            <option value={stateOrder[3]} key={index} disabled={isDisable}>{stateOrder[3]}</option>
                                            </select>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>  : <span className="no-data">Không có dữ liệu</span>}
                    
                </table>}
                {showPending && <table className="table">
                    <thead>
                        <tr className="table-tr">
                        <th scope="col" style={{width: '1%', borderRadius: '10px'}}>STT</th>
                        <th scope="col"style={{width: '5%'}}>ID</th>
                        <th scope="col" className="table-50">ĐƠN HÀNG</th>
                        <th scope="col"style={{width: '5%'}}>GIÁ</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY TẠO</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY CẬP NHẬT</th>
                        <th scope="col"style={{width: '10%', borderRadius: '10px'}}>TRẠNG THÁI</th>
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
                                    <td>{format_curency(item.price)}đ</td>
                                    <td>{createdAt.toLocaleString()}</td>
                                    <td>{updatedAt.toLocaleString()}</td>
                                    <td><select className="form-select  mb-3 select-option-status" value={stateOrder[2]} onChange={(e) => handleChangeState(item,e.target.value)}>
                                        
                                        <option value={stateOrder[0]} key={index} disabled={!isDisable}>{stateOrder[0]}</option>
                                        <option value={stateOrder[1]} key={index} disabled={isDisable}>{stateOrder[1]}</option>
                                        <option value={stateOrder[2]} key={index} disabled={isDisable}>{stateOrder[2]}</option>
                                        <option value={stateOrder[3]} key={index} disabled={isDisable}>{stateOrder[3]}</option>
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
                        <th scope="col" style={{width: '1%', borderRadius: '10px'}}>STT</th>
                        <th scope="col"style={{width: '5%'}}>ID</th>
                        <th scope="col" className="table-50">ĐƠN HÀNG</th>
                        <th scope="col"style={{width: '5%'}}>GIÁ</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY TẠO</th>
                        <th scope="col"style={{width: '10%'}}>NGÀY CẬP NHẬT</th>
                        <th scope="col"style={{width: '10%', borderRadius: '10px'}}>TRẠNG THÁI</th>
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
                                    <td>{format_curency(item.price)}đ</td>
                                    <td>{createdAt.toLocaleString()}</td>
                                    <td>{updatedAt.toLocaleString()}</td>
                                    <td><select className="form-select  mb-3 select-option-status" value={stateOrder[3]} onChange={(e) => handleChangeState(item,e.target.value)}>
                                        
                                        <option value={stateOrder[0]} key={index} disabled={!isDisable}>{stateOrder[0]}</option>
                                        <option value={stateOrder[1]} key={index} disabled={!isDisable}>{stateOrder[1]}</option>
                                        <option value={stateOrder[2]} key={index} disabled={!isDisable}>{stateOrder[2]}</option>
                                        <option value={stateOrder[3]} key={index} disabled={isDisable}>{stateOrder[3]}</option>
                                        </select>
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
const mapStateToProps = (state) => {
    return {
        order: state.Order,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateHistoryOrder : (id,order) => dispatch(updateHistoryOrder(id,order)),
    }
}
export default connect(mapStateToProps ,mapDispatchToProps)(Order)
