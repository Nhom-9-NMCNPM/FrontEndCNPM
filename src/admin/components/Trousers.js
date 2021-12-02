import { useState} from "react"
import { gql, useMutation } from '@apollo/client';
import Add from "../Add";
import Update from "../Update";
import { connect } from "react-redux";
import deleteTrousers from "../../mutation/deleteTrousers";
import { addTrousers, updateTrousers, removeTrousers } from "../../actions/trousers";
import NavHeader from "../../components/HomePage/NavHeader";
import Modal from 'react-modal'
import format_curency from "../../utils/displayPrice";
const ADD_TROUSERS = gql`
    mutation Mutation($data: createTrousersInput!) {
        createTrousers(data: $data) {
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
const UPDATE_TROUSERS = gql`
    mutation Mutation($data: updateTrousersInput!, $updateTrousersId: Int!) {
        updateTrousers(data: $data, id: $updateTrousersId) {
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
const Trousers = ({trousers, addTrousers, updateTrousers, removeTrousers}) => {
    const [showModalRemove, setShowModalRemove] = useState(false)
    const [showModalAdd, setShowModalAdd]= useState(false);
    const [flag, setFlag] = useState(0);
    const [showModalUpdate, setShowModalUpdate]= useState(false);
    const [update, statusUpdate] = useMutation(UPDATE_TROUSERS,{
        onCompleted: (data)=>{
            updateTrousers(data.updateTrousers.id, data.updateTrousers);
        }
    });
    const [add, statusAdd] = useMutation(ADD_TROUSERS,{
        onCompleted:(data)=>{
            addTrousers(data.createTrousers)
        }
    });
    
        
        const handleUpdateTrousers = (id) => {
            setFlag(id);
            setShowModalUpdate(true);
        }

        const handleRemoveTrousers = (id) => {
            deleteTrousers(id);
            removeTrousers(id);
            setShowModalRemove(false)
        }
        const handleAddTrousers = () => {
            setShowModalAdd(true);
        }
    return (
        <div>
            <NavHeader />
            <div className="margin-bottom">
            <h1>QUẦN</h1>
            <div className="table-product" >
            <table class="table table-bordered">
                <thead>
                    <tr className="table-tr table-warning" >
                        <th scope="col" className="table-title-pro">STT</th>
                        <th scope="col" className="table-title-pro">ID</th>
                        <th scope="col" className="table-title-pro">NGÀY TẠO</th>
                        <th scope="col" className="table-title-pro">NGÀY CẬP NHẬT</th>
                        <th scope="col" className="table-title-pro">TÊN</th>
                        <th scope="col" className="table-title-pro pro-des">MÔ TẢ</th>
                        <th scope="col" className="table-title-pro">ẢNH</th>
                        <th scope="col" className="table-title-pro">GIÁ</th>
                        <th scope="col" className="table-title-pro">MÃ SẢN PHẨM</th>
                        <th scope="col" className="table-title-pro">Size_M</th>
                        <th scope="col" className="table-title-pro">Size_S</th>
                        <th scope="col" className="table-title-pro">Size_L</th>
                        <th scope="col" className="table-title-pro">Size_XL</th>
                        <th scope="col" className="table-title-pro">CHẤT LIỆU</th>
                        <th scope="col" className="table-title-pro">MÀU</th>
                        <th scope="col" className="table-title-pro">THAO TÁC</th>
                        
                    </tr>
                </thead>
                <tbody>
                {trousers.map((item,index) => {
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
                                <td className='content '><img src={item.img[1]} alt=""/></td>
                                <td className='content'>{format_curency(item.price)}đ</td>
                                <td className='content'>{item.codePro}</td>
                                <td className='content'>{item.size_M}</td>
                                <td className='content'>{item.size_S}</td>
                                <td className='content'>{item.size_L}</td>
                                <td className='content'>{item.size_XL}</td>
                                <td className='content'>{item.material}</td>
                                <td className='content'>{item.color}</td>
                                <td className='content event-btn'>
                                    <button 
                                        onClick={()=>setShowModalRemove(item.id)}
                                        className='btn-remove btn btn-danger btn-sm px-3'
                                    >
                                        Xóa
                                    </button>
                                    <button 
                                        className='btn-update btn btn-warning'
                                        onClick={()=>handleUpdateTrousers(item.id)}
                                    >
                                        Sửa
                                    </button>
                                    {showModalUpdate&&(flag===item.id)&&<Update isDisplay={showModalUpdate} update={update} status={statusUpdate}  setShowModalUpdate={setShowModalUpdate} product={item}/>}
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
                                                    <button type="button" class="btn btn-danger btn-modal-remove" onClick={() => handleRemoveTrousers(item.id)}>Chắc chắn</button>
                                                    <button type="button" class="btn btn-primary btn-modal-cancel"onClick={() => setShowModalRemove(false)}>Hủy</button>
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

            </div>
            <button className='btn-add  btn btn-success' onClick={handleAddTrousers}>Thêm mới</button>
            <Add isDisplay={showModalAdd} add={add} status={statusAdd}  setShowModalAdd={setShowModalAdd} />
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        trousers: state.Trousers,
    }
}
const mapDispatchToProps = (dispatch) =>({
    addTrousers:(data)=> dispatch(addTrousers(data)),
    updateTrousers:(id,data) => dispatch(updateTrousers(id,data)),
    removeTrousers:(id) => dispatch(removeTrousers(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Trousers)