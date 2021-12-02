import Footer from "../../components/HomePage/Footer";
import NavHeader from "../../components/HomePage/NavHeader";
import { connect } from "react-redux";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import LoadingPage from "../../components/LoadingPage";
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
    if(loading){
        return <LoadingPage />
    }
    if(error){
        console.error(error);
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
    }
    return (
        <div>
            <NavHeader />
            <button type="button" class="btn btn-success" onClick={handleAddUser} >Thêm</button>
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
                        <td> <input type="text" value={data.email} onChange = {(e)=> setData({...data, email: e.target.value})} class="form-control" /></td>
                        <td><input type="text" value={data.phoneNumber} onChange = {(e)=> setData({...data, phoneNumber: e.target.value})} class="form-control"></input></td>
                        <td><input type="text" value={data.address} onChange = {(e)=> setData({...data, address: e.target.value})} class="form-control" /></td>
                        <td><input type="text" readOnly={true} class="form-control"></input></td>
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