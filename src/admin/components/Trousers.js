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
import { showSuccessToast } from "../../utils/displayToastMess";
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
    mutation Mutation($data: updateTrousersInput!, $proId: Int!) {
        updateTrousers(data: $data, proId: $proId) {
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

        const handleRemoveTrousers = async (item) => {
            await deleteTrousers(item);
            removeTrousers(item.id);
            setShowModalRemove(false);
            showSuccessToast("Đã xóa");
        }
        const handleAddTrousers = () => {
            setShowModalAdd(true);
        }
    return (
        <div>
            <NavHeader />
            <div className="margin-bottom">
            <div className="table-product" >
                <div className="table-product-title">
                    <div className="title-table-product-content">QUẦN</div>
                    <button className='btn-add  btn btn-success' onClick={handleAddTrousers}><i className="fas fa-plus" />Thêm mới</button>
                </div>
            <table class="table">
                <thead>
                    <tr className="table-tr " >
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
                <tbody className="table-body">
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
                                <td className='content '>
                                            <div className='content-img'>
                                                {item.description}
                                            </div>
                                        </td>
                                <td className='content img-pro'><img src={item.img[0]} alt="" /></td>
                                <td className='content'>{format_curency(item.price)}đ</td>
                                <td className='content'>{item.codePro}</td>
                                <td className='content'>{item.size_M}</td>
                                <td className='content'>{item.size_S}</td>
                                <td className='content'>{item.size_L}</td>
                                <td className='content'>{item.size_XL}</td>
                                <td className='content'>{item.material}</td>
                                <td className='content'>{item.color}</td>
                                <td className='content' >
                                    <div>
                                        <button 
                                            onClick={()=>setShowModalRemove(true)}
                                            className='btn-remove btn btn-danger btn-sm px-3'
                                        >
                                            <i class="fas fa-trash-alt"></i>
                                        </button>
                                        <button 
                                            className='btn-update btn btn-warning'
                                            onClick={()=>handleUpdateTrousers(item.id)}
                                        >
                                        <i class="fas fa-edit"></i>
                                        </button>
                                    </div>
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
                                                    <button type="button" class="btn btn-danger btn-modal-remove" onClick={() => handleRemoveTrousers(item)}>Chắc chắn</button>
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
            
            <Add isDisplay={showModalAdd} add={add} status={statusAdd}   setShowModalAdd={setShowModalAdd} />
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