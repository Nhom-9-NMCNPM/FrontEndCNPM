import Footer from "../../components/HomePage/Footer";
import NavHeader from "../../components/HomePage/NavHeader";
import { connect } from "react-redux";
import { useState} from "react";
import { useMutation, gql } from "@apollo/client";
import LoadingPage from "../../components/LoadingPage";
import {showSuccessToast} from '../../utils/displayToastMess';
import { updateUserList, deleteUserList, addUserList } from "../../actions/admin";
import Modal from "react-modal"
const DELETE_USER=gql`
    mutation DeleteUser($deleteUserId: Int!) {
        deleteUser(id: $deleteUserId) {
            id
            email
            name
            phoneNumber
            address
            point
  }
}
`
const UPDATE_USER= gql `
    mutation UpdateUser($data: updateUserInput!, $email: String!) {
        updateUser(data: $data, email: $email) {
            id
            name
            phoneNumber
            address
            point
            email
            admin
            staff
    }
}
`
const ADD_USER = gql `
    mutation Mutation($data: createUserInput!) {
        createUser(data: $data) {
            id
            email
            name
            phoneNumber
            address
            point
            orders {
            id
            createdAt
            updatedAt
            namePro
            price
            status
            }
            admin
            staff
        }
    }
`
const ManagerUser = ({userList, addUserList, deleteUserList, updateUserList}) => {
    const [data, setData] = useState({name: '', email: '', phoneNumber: '', address:'', point: 0})
    const [add] = useMutation(ADD_USER, {
        onCompleted: (data)=>{
            addUserList(data.createUser)
        }
    });
    const [update]= useMutation(UPDATE_USER, {
        onCompleted: (data)=>{
            updateUserList(data.updateUser.id, data.updateUser)
        }
    });
    const [deleteUser]=useMutation(DELETE_USER);
    const [buttonUpdate, setButtonUpdate]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showModalRemove, setShowModalRemove] = useState(-1);
    const [inputSearch, setInputSearch] = useState('') 

    const onClickButton= (buttonUpdate,user)=>{
        if(!data.name||!data.email||!data.phoneNumber||!data.address){
            showSuccessToast("Vui lòng điền đầy đủ các trường", 'Cảnh báo!', 'error')
        }else{
            if(buttonUpdate){
                handleUpdateUser(user);
            } else handleAddUser();
            setButtonUpdate(false);
        }
        
    }
    const handleAddUser = async () => {
        setIsLoading(true);
        await add({
            variables:{
                data: {
                    ...data,
                    point: 0,
                    admin: false,
                    staff: false,
                }
            }
        })
        setData({name: "",email:"",phoneNumber:"", address:"" });
        setIsLoading(false);
        showSuccessToast("Thêm thành công")
    }
    const handleUpdateUser =async (user) => {
        setIsLoading(true);
        await update({
            variables:{
                data: {
                    name: user.name,
                    phoneNumber: user.phoneNumber,
                    address: user.address
                }, 
                email: user.email
            }
        })
        setData({name: "",email:"",phoneNumber:"", address:"" });
        setIsLoading(false);
        showSuccessToast("Chỉnh sửa thành công")
    }
    const handleDeleteUser =async (user) => {
        setIsLoading(true);
        await deleteUser({
            variables:{
                deleteUserId: user.id
            }
        })
        deleteUserList(user.id);
        setIsLoading(false);
        showSuccessToast("Xóa thành công")
    }
    if(isLoading) return <LoadingPage />;
    return (
        <div>
            <NavHeader showUser={true} />
            <div className="margin-bottom">
                <div className="table-product">
                    <div className="table-product-title">
                        <div className="title-table-product-content">NGƯỜI DÙNG</div>
                    </div>
                    <table className="table ">
                        <thead>
                            <tr className="table-tr">
                            <th scope="col"className="table-title-pro" style={{width: '3%'}}>STT</th>
                            <th scope="col"className="table-title-pro" style={{width: '3%'}}>ID</th>
                            <th scope="col"className="table-title-pro" style={{width: '20%'}}>Tên</th>
                            <th scope="col"className="table-title-pro" style={{width: '20%'}}>Email</th>
                            <th scope="col"className="table-title-pro" style={{width: '10%'}}>SĐT</th>
                            <th scope="col"className="table-title-pro" style={{width: '30%'}}>Địa chỉ</th>
                            <th scope="col"className="table-title-pro" style={{width: '7%'}}>Điểm tích lũy</th>
                            <th scope="col"className="table-title-pro" style={{width: '7%'}}>Tùy chọn</th>
                            </tr>
                        </thead>
                        <tbody className="table-body"> 
                            <tr>
                                <td><input type="text" readOnly={true}  className="form-control"/></td>
                                <td><input type="text" readOnly={true}  className="form-control"/></td>
                                <td><input type="text" value={data.name} onChange = {(e)=> setData({...data, name: e.target.value})}  className="form-control"/></td>
                                <td><input type="text" readOnly={buttonUpdate} value={data.email} onChange = {(e)=> setData({...data, email: e.target.value})} className="form-control" /></td>
                                <td><input type="text" value={data.phoneNumber} onChange = {(e)=> setData({...data, phoneNumber: e.target.value})} className="form-control"></input></td>
                                <td><input type="text" value={data.address} onChange = {(e)=> setData({...data, address: e.target.value})} className="form-control" /></td>
                                <td><input type="text" readOnly={true} className="form-control"></input></td>
                                <td className='text-center'>
                                    <button type="button" className='btn-add btn btn-success' onClick={()=>onClickButton(buttonUpdate, data)} >{buttonUpdate?"Sửa":(<><i className="fas fa-plus" />Thêm mới</>)}</button>
                                    {buttonUpdate&&<i className="fas fa-redo cursor mt-2" onClick={()=>{setButtonUpdate(false);setData({name: "",email:"",phoneNumber:"", address:"" })}} ></i>}
                                </td>
                            </tr>
                            {
                                userList.map((item,index)=>{
                                    return (
                                        <>
                                        <tr>
                                            <th scope="row">{index+1}</th>
                                            <td className='content'>{item.id}</td>
                                            <td className='content'>{item.name}</td>
                                            <td className='content'>{item.email}</td>
                                            <td className='content'>{item.phoneNumber}</td>
                                            <td className='content'>{item.address}</td>
                                            <td className='content'>{item.point}</td>
                                            <td className='content' style={{paddingLeft: '20px',paddingRight: '20px'}}>
                                                <button type="button" className='btn-update btn btn-warning'  onClick={()=>{setData({id: item.id, name:item.name, email:item.email,phoneNumber:item.phoneNumber,address:item.address}); setButtonUpdate(true);}} ><i className="fas fa-edit"></i></button>
                                                <br />
                                                <button type="button" className='btn-remove btn btn-danger btn-sm px-3 mt-2' onClick={()=>{setShowModalRemove(item.id)}}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                        <Modal
                                            isOpen={showModalRemove===item.id}
                                            className="modal-react custom-modal-react"
                                            ariaHideApp={false}
                                        >
                                            <div className="modal-body-react" >
                                                <div className="close-modal" onClick={()=>setShowModalRemove(false)}>
                                                    <i className="far fa-times-circle"></i>
                                                </div>
                                                <div>
                                                    <div>Bạn có chắc chắn xóa không ?</div>
                                                    <div className="modal-btn">
                                                        <button type="button" className="btn btn-danger btn-modal-remove" onClick={() => handleDeleteUser(item)}>Chắc chắn</button>
                                                        <button type="button" className="btn btn-primary btn-modal-cancel" onClick={() => setShowModalRemove(false)} >Hủy</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                        </>
                                    )
                                })
                            }
                        </tbody>    
                    </table>
                </div>

            </div>
        </div>
    )
}
const mapStateToProps = (state)  => {
    return {
        userList: state.UserList,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        updateUserList: (id, data) => dispatch(updateUserList(id, data)),
        addUserList:(data) => dispatch(addUserList(data)),
        deleteUserList:(id) => dispatch(deleteUserList(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManagerUser);