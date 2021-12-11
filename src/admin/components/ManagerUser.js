import Footer from "../../components/HomePage/Footer";
import NavHeader from "../../components/HomePage/NavHeader";
import { connect } from "react-redux";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import LoadingPage from "../../components/LoadingPage";
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
const ManagerUser = ({userList}) => {
    const [data, setData] = useState({name: '', email: '', phoneNumber: '', address:'', point: 0})
    const [add, {data1, loading, error}] = useMutation(ADD_USER);
    const [update]= useMutation(UPDATE_USER);
    const [deleteUser]=useMutation(DELETE_USER);
    const [buttonUpdate, setButtonUpdate]=useState(false);
    if(loading){
        return <LoadingPage />
    }
    if(error){
        console.error(error);
    }
    const onClickButton= (buttonUpdate,user)=>{
        if(buttonUpdate){
            handleUpdateUser(user);
        } else handleAddUser(user);
        setButtonUpdate(false);
    }
    const handleAddUser = () => {
        add({
            variables:{
                data: {
                    ...data,
                    admin: false,
                    staff: false,
                }
            }
        })
        setData({name: "",email:"",phoneNumber:"", address:"" });
        window.location.reload();
    }
    const handleUpdateUser = (user) => {
        update({
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
        window.location.reload();
    }
    const handleDeleteUser = (user) =>{
        deleteUser({
            variables:{
                deleteUserId: user.id
            }
        })
        window.location.reload();
    }
    return (
        <div>
            <NavHeader />
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">STT</th>
                    <th scope="col">ID</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Điểm tích lũy</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" readOnly={true}  class="form-control"/></td>
                        <td><input type="text" readOnly={true}  class="form-control"/></td>
                        <td><input type="text" value={data.name} onChange = {(e)=> setData({...data, name: e.target.value})}  class="form-control"/></td>
                        <td><input type="text" readOnly={buttonUpdate} value={data.email} onChange = {(e)=> setData({...data, email: e.target.value})} class="form-control" /></td>
                        <td><input type="text" value={data.phoneNumber} onChange = {(e)=> setData({...data, phoneNumber: e.target.value})} class="form-control"></input></td>
                        <td><input type="text" value={data.address} onChange = {(e)=> setData({...data, address: e.target.value})} class="form-control" /></td>
                        <td><input type="text" readOnly={true} class="form-control"></input></td>
                        <td><button type="button" className='btn-add btn btn-success' onClick={()=>onClickButton(buttonUpdate, data)} >{buttonUpdate?"Sửa":"+Thêm"}</button></td>
                    </tr>
                    {
                        userList.map((item,index)=>{
                            return (
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.address}</td>
                                    <td>{item.point}</td>
                                    <td><button type="button" className='btn-update btn btn-warning' onClick={()=>{setData({id: item.id, name:item.name, email:item.email,phoneNumber:item.phoneNumber,address:item.address}); setButtonUpdate(true);}} ><i class="fas fa-edit"></i></button></td>
                                    <td><button type="button" className='btn-remove btn btn-danger btn-sm px-3' onClick={()=>{handleDeleteUser(item)}}><i class="fas fa-trash-alt"></i></button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>    
            </table>
        </div>
    )
}
const mapStateToProps = (state)  => {
    return {
        userList: state.UserList,
    }
}
export default connect(mapStateToProps)(ManagerUser);