import { useState, useEffect} from "react"
import { connect } from "react-redux";
import { gql, useMutation } from '@apollo/client';
import Add from "../Add";
import Update from "../Update";
import deleteSkirt from '../../mutation/deleteSkirt';
import {addSkirt, updateSkirt, removeSkirt} from '../../actions/skirt';
import NavHeader from "../../components/HomePage/NavHeader";
import Modal from 'react-modal'
import format_curency from "../../utils/displayPrice";
import { showSuccessToast } from "../../utils/displayToastMess";
const ADD_SKIRT = gql`
        mutation Mutation($data: createSkirtInput!) {
        createSkirt(data: $data) {
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
const UPDATE_SKIRT = gql`
    mutation Mutation($data: updateSkirtInput!, $proId: Int!) {
        updateSkirt(data: $data, proId: $proId) {
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
const Skirt = ({skirt, addSkirt}) => {
    const [showModalRemove, setShowModalRemove] = useState(-1)
    const [showModalAdd, setShowModalAdd]= useState(false);
    const [flag, setFlag] = useState(0);
    const [showModalUpdate, setShowModalUpdate]= useState(false);
    const [inputSearch, setInputSearch] = useState('') 
    const [showResult, setShowResult] = useState(false)
    const resultArray = skirt.filter((item) => {
        return item.name.toLowerCase().indexOf(inputSearch.toLowerCase()) !== -1
    })
    console.log(resultArray);
    const [update, statusUpdate] = useMutation(UPDATE_SKIRT,{
        onCompleted: (data)=>{
            updateSkirt(data.updateSkirt.id, data.updateSkirt);
        }
    });
    const [add, statusAdd] = useMutation(ADD_SKIRT,{
        onCompleted: (data)=>{
            addSkirt(data.createSkirt);
        }
    });
    useEffect(() => {
        if(inputSearch.length > 0) {
            setShowResult(true)
        } 
        else (
            setShowResult(false)
        )
    },[inputSearch.length])
        const handleUpdateSkirt= (id) => {
            setFlag(id);
            setShowModalUpdate(true);
        }

        const handleRemoveSkirt = async (item) => {
            await deleteSkirt(item);
            removeSkirt(item.id);
            setShowModalRemove(false);
            showSuccessToast("Đã xóa")
        }
        const handleAddSkirt = () => {
            setShowModalAdd(true);
        }
        const handleInputSearch = (e) => {
            setInputSearch(e)
        }
    return (
        <div>
            <NavHeader />
            <div className="margin-bottom">
            <div className="table-product " >
                <div className="table-product-title">
                    <div className="title-table-product-content">VÁY</div>
                    <div className="admin-right-product">
                        <div className="admin-search">
                                    <form action="search" className="header-form-admin-product">
                                            <input autoFocus={true} type="text" className="header-search-admin-product" placeholder="Tìm sản phẩm..." 
                                                value={inputSearch} onChange={(e) => {handleInputSearch(e.target.value)}}
                                            />
                                            <div className="close-search-product"><i class="fas fa-search" /></div>
                                    </form>
                    </div>
                    <button className='btn-add btn btn-success' onClick={handleAddSkirt}><i className="fas fa-plus" />Thêm mới</button>
                    </div>
                </div>
                <table className="table">
                    <thead >
                    <tr class="table-tr">
                        <th scope="col" class="table-title-pro" style={{width:" 1%"}}>STT</th>
                        <th scope="col" class="table-title-pro" style={{width:" 1%"}}>ID</th>
                        <th scope="col" class="table-title-pro" style={{width:" 9%"}}>NGÀY TẠO</th>
                        <th scope="col" class="table-title-pro" style={{width:" 10%"}}>NGÀY CẬP NHẬT</th>
                        <th scope="col" class="table-title-pro" style={{width:" 13%"}}>TÊN</th>
                        <th scope="col" class="table-title-pro pro-des">MÔ TẢ</th>
                        <th scope="col" class="table-title-pro" style={{width:" 5%"}}>ẢNH</th>
                        <th scope="col" class="table-title-pro" style={{width:" 5%"}}>GIÁ</th>
                        <th scope="col" class="table-title-pro" style={{width:" 10%"}}>MÃ SẢN PHẨM</th>
                        <th scope="col" class="table-title-pro" style={{width:" 1%"}}> Size_M</th>
                        <th scope="col" class="table-title-pro" style={{width:" 1%"}}>Size_S</th>
                        <th scope="col" class="table-title-pro" style={{width:" 1%"}}>Size_L</th>
                        <th scope="col" class="table-title-pro" style={{width:" 1%"}}>Size_XL</th>
                        <th scope="col" class="table-title-pro" style={{width:" 7%"}}>CHẤT LIỆU</th>
                        <th scope="col" class="table-title-pro" style={{width:" 6%"}}>MÀU</th>
                        <th scope="col" class="table-title-pro" style={{width:" 7%"}}>THAO TÁC</th>
                    </tr>
                    </thead>
                        {showResult ? 

                            resultArray.length !== 0 ? 
                            
                            <tbody className="table-body">     
                            {resultArray.map((item,index) => {
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
                                        <td className='content img-pro'><img src={item.img[0]} alt=""/></td>
                                        <td className='content'>{format_curency(item.price)}đ</td>
                                        <td className='content'>{item.codePro}</td>
                                        <td className='content'>{item.size_M}</td>
                                        <td className='content'>{item.size_S}</td>
                                        <td className='content'>{item.size_L}</td>
                                        <td className='content'>{item.size_XL}</td>
                                        <td className='content'>{item.material}</td>
                                        <td className='content'>{item.color}</td>
                                        <td className='content' style={{paddingLeft: '20px',paddingRight: '20px'}}>
                                            <div>
                                                <button 
                                                    onClick={()=>setShowModalRemove(item.id)}
                                                    className='btn-remove btn btn-danger btn-sm px-3'
                                                >
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                                <button 
                                                    className='btn-update btn btn-warning'
                                                    onClick={()=>handleUpdateSkirt(item.id)}
                                                >
                                                <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                            {showModalUpdate&&(flag===item.id)&&<Update isDisplay={showModalUpdate} update={update} status={statusUpdate}  setShowModalUpdate={setShowModalUpdate} product={item}/>}
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
                                                            <button type="button" class="btn btn-danger btn-modal-remove" onClick={() => handleRemoveSkirt(item)}>Chắc chắn</button>
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
                        :
                        
                        <span className="no-data">Không tìm thấy sản phẩm</span>
                        
                        : 
                        <tbody className="table-body">
                            {skirt.map((item,index) => {
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
                                        <td className='content img-pro'><img src={item.img[0]} alt=""/></td>
                                        <td className='content'>{format_curency(item.price)}đ</td>
                                        <td className='content'>{item.codePro}</td>
                                        <td className='content'>{item.size_M}</td>
                                        <td className='content'>{item.size_S}</td>
                                        <td className='content'>{item.size_L}</td>
                                        <td className='content'>{item.size_XL}</td>
                                        <td className='content'>{item.material}</td>
                                        <td className='content'>{item.color}</td>
                                        <td className='content'style={{paddingLeft: '20px',paddingRight: '20px'}}>
                                            <div>
                                                <button 
                                                    onClick={()=>setShowModalRemove(item.id)}
                                                    className='btn-remove btn btn-danger btn-sm px-3'
                                                >
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                                <button 
                                                    className='btn-update btn btn-warning'
                                                    onClick={()=>handleUpdateSkirt(item.id)}
                                                >
                                                <i class="fas fa-edit"></i>
                                                </button>
                                            </div>
                                            {showModalUpdate&&(flag===item.id)&&<Update isDisplay={showModalUpdate} update={update} status={statusUpdate}  setShowModalUpdate={setShowModalUpdate} product={item}/>}
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
                                                            <button type="button" class="btn btn-danger btn-modal-remove" onClick={() => handleRemoveSkirt(item)}>Chắc chắn</button>
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
                    }
                </table>
            </div>

            
            <Add isDisplay={showModalAdd} add={add} status={statusAdd} setShowModalAdd={setShowModalAdd} />
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        skirt: state.Skirt,
    }
}
const mapDispatchToProps = (dispatch) => ({
    addSkirt: (data) => dispatch(addSkirt(data)),
    updateSkirt:(id,data) => dispatch(updateSkirt(id,data)),
    removeSkirt:(id) => dispatch(removeSkirt(id)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Skirt)