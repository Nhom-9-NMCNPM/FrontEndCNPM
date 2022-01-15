import "../../style/User/DetailUser.css"
import "../../style/HomePage/responsive.css"
import {connect} from "react-redux";
import {startLogin, stopLogin} from'../../actions/user';
import { Link } from "react-router-dom";
import {useMutation, gql} from "@apollo/client";
import format_curency from "../../utils/displayPrice";
import {useState} from 'react'
import LoadingPage from "../LoadingPage";
import { showSuccessToast } from "../../utils/displayToastMess";
import { cancelOrder } from "../../actions/user";
const DELETE_ORDER=gql`
mutation Mutation($deleteOrderId: Int!) {
  deleteOrder(id: $deleteOrderId) {
    id
  }
}
`
const DetailUser = ({user, login, logout, product, cancelOrder}) => {
    const [showFile, setShowFile] = useState(true);
    const [waitConfirm, setWaitConfirm] = useState(1);
    const [status, setStatus] = useState('Chờ xử lý')
    const [deleteOrder, {loading, error}] = useMutation(DELETE_ORDER, {
        onCompleted: (data)=>{
            showSuccessToast('Hủy thành công');
            setWaitConfirm(4)
            setStatus('Hủy đơn hàng')
        }
    })
    
    if(loading) return <LoadingPage />
    if(!user.email){
        return (
            <div className="title-user">
                <h1>Tài khoản của bạn</h1>
                <div className="d-inline-block mt-2">
                    <span>Quý khách vui lòng đăng nhập để tiếp tục</span>
                    <button type="button" 
                    className="btn btn-dark addCart mt-2 "
                    onClick={login}
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        )
    }
    const arrOrder = user.orders.filter(item => item.status === status) || [];
    return (
        <div className="row">
            <div className="col-3">
                <div className="user-infor d-flex">
                    <div>
                        <i className="far fa-user" style={{fontSize: '2.5rem',
                            padding: '12px',
                            border:' solid 1px #ccc',
                            borderRadius: '50%'}}></i>
                    </div>
                    <div style={{padding: '.2rem 0 0 1rem'}}>
                        <p>{user.name}</p>
                    </div>
                </div>
                <div className="user-option">
                    <ul>
                        <li onClick={() => setShowFile(true)} className="cursor" >Tài khoản của tôi</li>
                        <li onClick={() => setShowFile(false)} className="cursor">Đơn hàng</li>
                        <li onClick={logout} className="cursor">Đăng xuất</li>
                    </ul>
                </div>
            </div>
            <div className="col-9" style={{minHeight:'38rem'}}>
                <>
                {
                    showFile?(
                        <div className="user-detail">
                            <h4>Hồ Sơ Của Tôi</h4>                
                            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                        </div>
                    ):(
                        <ul className="nav nav-tabs">
                            <li className="nav-item cursor" onClick={()=>{
                                setWaitConfirm(1)
                                setStatus('Chờ xử lý')    
                            }}>
                                <h5 className={waitConfirm===1?'nav-link active':'nav-link'} aria-current="page" href="#">Chờ xử lý</h5>
                            </li>
                            <li className="nav-item cursor" onClick={()=>{
                                setWaitConfirm(2)
                                setStatus('Đang giao hàng')    
                            }}>
                                <h5 className={waitConfirm===2?'nav-link active':'nav-link'} href="#">Đang giao</h5>
                            </li>
                            <li className="nav-item cursor" onClick={()=>{
                                setWaitConfirm(3)
                                setStatus('Đã giao hàng')    
                            }}>
                                <h5 className={waitConfirm===3?'nav-link active':'nav-link'} href="#">Đã giao</h5>
                            </li>
                            <li className="nav-item cursor" onClick={()=>{
                                setWaitConfirm(4)
                                setStatus('Hủy đơn hàng')    
                            }}>
                                <h5 className={waitConfirm===4?'nav-link active':'nav-link'} href="#">Đã hủy</h5>
                            </li>
                        </ul>
                    )
                }
                   
                </>
                <div className="user-details">
                    <ul>
                    {
                        showFile?(<>
                             <li>Tên Khách Hàng: {user.name}</li>
                                <li>Số Điện Thoại: {user.phoneNumber}</li>
                                <li>Email: {user.email}</li>
                                <li>Địa Chỉ: {user.address}</li>
                            </>
                               
                        ):(
                            arrOrder.length===0?<h6>Bạn không có đơn hàng nào</h6>:
                            arrOrder.map(item => {
                                const arrProduct = item.namePro.map((pro) => {
                                    return {
                                        infor: pro,
                                        img: product.find((item)=> item.codePro===pro.slice(pro.length-10, pro.length))
                                    }
                                })
                                return (
                                    <div style={{borderBottom:'solid 1px #ccc', padding:'1rem 0'}}>
                                        {
                                            waitConfirm===1&&
                                            <div className="d-flex justify-content-end">
                                                <button type="button" class="btn btn-danger" onClick={()=>{
                                                    deleteOrder({variables:{deleteOrderId: item.id}})
                                                    cancelOrder(item.id);
                                                }}>Hủy đơn hàng</button>
                                            </div>
                                        }
                                        {
                                            arrProduct.map((order, index) => {
                                                var createdAt = new Date(parseFloat(item.createdAt));
                                                var updatedAt = new Date(parseFloat(item.updatedAt));
                                                return (
                                                        <li className="header__cart-item" style={{padding:'0', marginTop:'1rem'}} key={index}>
                                                            <img src={order.img.img[0]} alt="" style={{width:'10%'}}/>
                                                            <div className="d-flex flex-column" style={{width:'100%'}}>
                                                                <div className="header__cart-item-info d-flex justify-content-between" style={{width:'100%'}}>
                                                                    <div >
                                                                        <h5 className="header__cart-item-name" style={{paddingLeft:'1rem'}}>{order.infor}</h5>
                                                                    </div>
                                                                    
                                                                    <div>
                                                                        <h5>{format_curency(order.img.price)}đ</h5>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h5 className="header__cart-item-name" style={{paddingLeft:'1rem'}}>Ngày đặt: {createdAt.toLocaleString()}</h5>
                                                                </div>
                                                            </div>
                                                        </li>
                                                )
                                            })
                                        }
                                        <div className="d-flex justify-content-end" >
                                            <h5 style={{padding: '1rem',
                                            backgroundColor: '#e29481'}}>Tổng giá tiền: {format_curency(item.price)}đ</h5>
                                        </div>
                                    </div>
                                )
                            })
                            
                        )
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state)  => {
    return {
        user: state.User,
        product: [
            ...state.Dress,
            ...state.Shirt,
            ...state.Skirt,
            ...state.Trousers
        ]
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        login:()=> dispatch(startLogin()),
        logout:()=> dispatch(stopLogin()),
        cancelOrder:(id)=> dispatch(cancelOrder(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailUser)







