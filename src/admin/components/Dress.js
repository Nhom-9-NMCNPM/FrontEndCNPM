import { useState} from "react"
import Add from "../Add";
import Update from "../Update";
import { connect } from "react-redux";
import { gql, useMutation } from '@apollo/client';
import deleteDress from '../../mutation/deleteDress';
import {addDress, updateDress, removeDress} from '../../actions/dress';
import NavHeader from "../../components/HomePage/NavHeader";
import Modal from 'react-modal'
const ADD_DRESS = gql`
    mutation Mutation($data: createDressInput!) {
        createDress(data: $data) {
            id
            name
            description
            img
            updatedAt
            createdAt
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
}
`
const UPDATE_DRESS = gql`
    mutation Mutation($data: updateDressInput!, $updateDressId: Int!) {
        updateDress(data: $data, id: $updateDressId) {
            id
            name
            description
            img
            updatedAt
            createdAt
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
    }
`;
const Dress = ({dress, addDress, updateDress, removeDress }) => {
    const [showModalRemove, setShowModalRemove] = useState(false)
    const [showModalAdd, setShowModalAdd]= useState(false);
    const [flag, setFlag] = useState(0);
    const [showModalUpdate, setShowModalUpdate]= useState(false);
    const [update, { data_update, loading_update, error_update }] = useMutation(UPDATE_DRESS,{
        onCompleted: (data)=>{
            updateDress(data.updateDress.id, data.updateDress);
        }
    });
    const [add, { data, loading, error }] = useMutation(ADD_DRESS,
            {
                onCompleted:(data)=>{
                    addDress(data.createDress);
                }
            }
        );
        
        const handleUpdateDress= (id) => {
            setFlag(id);
            setShowModalUpdate(true);
        }

        const handleRemoveDress = (id) => {
            deleteDress(id);
            removeDress(id);
            setShowModalRemove(false)
        }

        const handleAddDress = () => {
            setShowModalAdd(true);
        }
    return (
        <div>
            <NavHeader />
            
            <div className="margin-bottom">
            <h1>ĐẦM</h1>
            
            <table className="table">
                <thead>
                    <tr className="table-tr">
                        <th scope="col">STT</th>
                        <th scope="col">ID</th>
                        <th scope="col">NGÀY TẠO</th>
                        <th scope="col">NGÀY CẬP NHẬT</th>
                        <th scope="col">TÊN</th>
                        <th scope="col">MÔ TẢ</th>
                        <th scope="col">ẢNH</th>
                        <th scope="col">GIÁ</th>
                        <th scope="col">MÃ SẢN PHẨM</th>
                        <th scope="col">Size_M</th>
                        <th scope="col">Size_S</th>
                        <th scope="col">Size_L</th>
                        <th scope="col">Size_XL</th>
                        <th scope="col">CHẤT LIỆU</th>
                        <th scope="col">MÀU</th>
                        <th scope="col">THAO TÁC</th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                    {dress.map((item,index) => {
                        var createdAt = new Date(parseFloat(item.createdAt));
                        var updatedAt = new Date(parseFloat(item.updatedAt));
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td className='content'>{item.id}</td>
                                <td className='content'>{createdAt.toLocaleString()}</td>
                                <td className='content'>{updatedAt.toLocaleString()}</td>
                                <td className='content'>{item.name}</td>
                                <td className='content '>{item.description}</td>
                                <td className='content '>{item.img.join('\n')}</td>
                                <td className='content'>{item.price}</td>
                                <td className='content'>{item.codePro}</td>
                                <td className='content'>{item.size_M}</td>
                                <td className='content'>{item.size_S}</td>
                                <td className='content'>{item.size_L}</td>
                                <td className='content'>{item.size_XL}</td>
                                <td className='content'>{item.material}</td>
                                <td className='content'>{item.color}</td>
                                <td className='content event-btn'>
                                    <button 
                                        onClick={()=>setShowModalRemove(true)}
                                        className='btn-remove'
                                    >
                                        Xóa
                                    </button>
                                    <button 
                                        className='btn-update'
                                        onClick={()=>handleUpdateDress(item.id)}
                                    >
                                        Sửa
                                    </button>
                                    {showModalUpdate&&(flag===item.id)&&<Update isDisplay={showModalUpdate} update={update} loading={loading_update} error={error_update}  setShowModalUpdate={setShowModalUpdate} product={item}/>}
                                    <Modal
                                        isOpen={showModalRemove}
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
                                                    <button type="button" class="btn btn-danger btn-modal-remove" onClick={() => handleRemoveDress(item.id)}>Chắc chắn</button>
                                                    <button type="button" class="btn btn-primary btn-modal-cancel" onClick={() => setShowModalRemove(false)}>Hủy</button>
                                                </div>
                                            </div>
                                        </div>
                                     </Modal>
                                </td>
                            </tr>
                            
                        )
                        
                    })}
                    
                </tbody>
            </table>

            <button className='btn-add' onClick={handleAddDress}>Thêm mới</button>
            
            <Add isDisplay={showModalAdd} add={add} loading={loading} error={error}  setShowModalAdd={setShowModalAdd} />
            
            
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dress: state.Dress,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        addDress:(data) => dispatch(addDress(data)),
        updateDress:(id,data) => dispatch(updateDress(id,data)),
        removeDress:(id) => dispatch(removeDress(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dress)