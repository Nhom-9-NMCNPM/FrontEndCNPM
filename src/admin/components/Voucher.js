import Footer from "../../components/HomePage/Footer"
import NavHeader from "../../components/HomePage/NavHeader"
import { connect } from "react-redux"
import { useState } from "react";
import { addVoucher, updateVoucher, removeVoucher } from '../../actions/voucher';
import { addVoucherPremium, updateVoucherPremium, removeVoucherPremium } from "../../actions/voucherPremium";
import format_curency from "../../utils/displayPrice";
import { useMutation, gql } from "@apollo/client";
import LoadingPage from "../../components/LoadingPage";
import { Redirect } from "react-router";
import { showSuccessToast } from '../../utils/displayToastMess';
import Modal from "react-modal"


const ADD_VOUCHER = gql`
    mutation Mutation($data: createVoucherInput!) {
        createVoucher(data: $data) {
            id
            updatedAt
            createdAt
            disCount
            condition
        }
    }
`
const UPDATE_VOUCHER = gql`
    mutation UpdateVoucher($data: updateVoucherInput!, $id: Int!) {
        updateVoucher(data: $data, id: $id) {
            id
            updatedAt
            createdAt
            disCount
            condition
    }
}
`
const DELETE_VOUCHER = gql`
    mutation DeleteVoucher($deleteVoucherId: Int!) {
        deleteVoucher(id: $deleteVoucherId) {
            id
            updatedAt
            createdAt
            disCount
            condition
  }
}
`
const ADD_VOUCHER_PREMIUM = gql`
    mutation Mutation($data: createVoucherPremiumInput!) {
        createVoucherPremium(data: $data) {
            id
            updatedAt
            createdAt
            disCount
            condition
        }
    }
`
const UPDATE_VOUCHER_PREMIUM = gql`
    mutation UpdateVoucherPremium($data: updateVoucherPremiumInput!, $id: Int!) {
        updateVoucherPremium(data: $data, id: $id) {
            id
            updatedAt
            createdAt
            disCount
            condition
    }
}
`
const DELETE_VOUCHER_PREMIUM = gql`
    mutation DeleteVoucherPremium($deleteVoucherPremiumId: Int!) {
        deleteVoucherPremium(id: $deleteVoucherPremiumId) {
            id
            updatedAt
            createdAt
            disCount
            condition
  }
}
`
const Voucher = ({ voucher, addVoucher, updateVoucher, removeVoucher, voucherPremium, addVoucherPremium, updateVoucherPremium, removeVoucherPremium }) => {

    // Đổ dữ liệu từ backend ra
    const [showVoucher, setShowVoucher] = useState(true)
    const [showVoucherPremium, setVoucherPremium] = useState(false)
    const handleShowVoucher = () => {
        setShowVoucher(true);
        setVoucherPremium(false);
        setData(
            {
                disCount: 0,
                condition: 0
            }
        )
    }
    const handleShowVoucherPremium = () => {
        setShowVoucher(false);
        setVoucherPremium(true);
        setData(
            {
                disCount: 0,
                condition: 0
            }
        )
    }

    // Chức năng add
    const [data, setData] = useState({ disCount: 0, condition: 0 })
    const [add] = useMutation(ADD_VOUCHER, {
        onCompleted: (data) => {
            addVoucher(data.createVoucher)
        }
    }
    )
    const [addPremium] = useMutation(ADD_VOUCHER_PREMIUM, {
        onCompleted: (data) => {
            addVoucherPremium(data.createVoucherPremium)
        }
    }
    )
    const handleAddVoucher = () => {
        if (data.disCount === 0) {
            alert("Vui lòng nhập lại!")
        }
        else {
            if (showVoucher){
                add({
                    variables: {
                        data: {
                            disCount: parseInt(data.disCount),
                            condition: parseInt(data.condition)
                        }
                    }
                })
            } else{
                addPremium({
                    variables: {
                        data: {
                            disCount: parseInt(data.disCount),
                            condition: parseInt(data.condition)
                        }
                    }
                })
            }
            
            setData(
                {
                    disCount: 0,
                    condition: 0
                }
            )
            showSuccessToast("Thêm thành công")
        }
    }
    

    // Chức năng update
    const [buttonUpdate, setButtonUpdate] = useState(false);
    const [update] = useMutation(UPDATE_VOUCHER, {
        onCompleted: (data) => {
            updateVoucher(data.updateVoucher.id, data.updateVoucher)
        }
    });
    const [updatePremium] = useMutation(UPDATE_VOUCHER_PREMIUM, {
        onCompleted: (data) => {
            updateVoucherPremium(data.updateVoucherPremium.id, data.updateVoucherPremium)
        }
    });
    const onClickButton = (buttonUpdate) => {
        if (data.disCount == 0) {
            showSuccessToast("Vui lòng điền giá trị của Voucher!", 'Cảnh báo!', 'error')
        } else {
            if (buttonUpdate) {
                handleUpdateVoucher();
            } else handleAddVoucher();
            setButtonUpdate(false);
        }
    }
    const handleUpdateVoucher = () => {
        if (showVoucher){
            update({
                variables: {
                    data: {
                        disCount: parseInt(data.disCount),
                        condition: parseInt(data.condition)
                    },
                    id: data.id
                }
            })
        } else{
            updatePremium({
                variables: {
                    data: {
                        disCount: parseInt(data.disCount),
                        condition: parseInt(data.condition)
                    },
                    id: data.id
                }
            })
        }
        
        setData(
            {
                disCount: 0,
                condition: 0
            }
        )
        showSuccessToast("Chỉnh sửa thành công")
    }

    // Chức năng remove:
    const [deleteVoucher] = useMutation(DELETE_VOUCHER);
    const [deleteVoucherPremium] = useMutation(DELETE_VOUCHER_PREMIUM);
    const [showModalRemove, setShowModalRemove] = useState(-1);
    const handleDeleteVoucher = async (voucher) => {
        if (showVoucher){
            await deleteVoucher({
                variables: {
                    deleteVoucherId: voucher.id
                }
            })
            removeVoucher(voucher.id);

        }
        else {
            await deleteVoucherPremium({
                variables: {
                    deleteVoucherPremiumId: voucher.id
                }
            })
            removeVoucherPremium(voucher.id);

        }
        
        showSuccessToast("Xóa thành công")
    }

    return (
        <div>
            <NavHeader />
            <div className="margin-bottom">
                <div className="table-title-revenue">
                    <h1>VOUCHER</h1>
                    <button type="button" className="btn btn-outline-secondary voucher-btn" onClick={handleShowVoucher} >Voucher chung</button>
                    <button type="button" className="btn btn-outline-secondary voucher-btn" onClick={handleShowVoucherPremium}>Voucher riêng</button>
                </div>

                {showVoucher && <table class="table" style={{ display: '"inline-block' }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '5%' }}>STT</th>
                            <th scope="col" style={{ width: '5%' }}>ID</th>
                            <th scope="col">NGÀY TẠO</th>
                            <th scope="col">NGÀY CẬP NHẬT</th>
                            <th scope="col">GIÁ TRỊ (%)</th>
                            <th scope="col">ĐIỀU KIỆN</th>
                            <th scope="col" style={{ width: '7%' }}>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" readOnly={true} value={0} class="form-control" /></td>
                            <td><input type="text" value={data.id} readOnly={true} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control"></input></td>
                            <td><input type="text" value={data.disCount} onChange={(e) => setData({ ...data, disCount: e.target.value })} class="form-control" /></td>
                            <td><input type="text" value={data.condition} onChange={(e) => setData({ ...data, condition: e.target.value })} class="form-control"></input></td>
                            <td><button type="button" className='btn-add btn btn-success' onClick={() => onClickButton(buttonUpdate)} >{buttonUpdate ? "Sửa" : (<><i className="fas fa-plus" />Thêm mới</>)}</button></td>
                        </tr>
                        {
                            voucher.map((voucher, index) => {
                                var createdAt = new Date(parseFloat(voucher.createdAt));
                                var updatedAt = new Date(parseFloat(voucher.updatedAt));
                                return (
                                    <>
                                        <tr>
                                            <th scope="row" key={index}>{index + 1}</th>
                                            <td>{voucher.id}</td>
                                            <td>{createdAt.toLocaleString()}</td>
                                            <td>{updatedAt.toLocaleString()}</td>
                                            <td>{voucher.disCount}</td>
                                            <td>{voucher.condition}</td>
                                            <div>
                                                <button 
                                                    className='btn-update btn btn-warning px-3'
                                                    onClick={() => { setData({ id: voucher.id, disCount: voucher.disCount, condition: voucher.condition }); setButtonUpdate(true); }}
                                                >
                                                <i class="fas fa-edit"></i>
                                                </button>
                                                <button 
                                                    onClick={() => { setShowModalRemove(voucher.id) }}
                                                    className='btn-remove btn btn-danger btn-sm mt-2'
                                                >
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                                
                                            </div>
                                        </tr>

                                        <Modal
                                            isOpen={showModalRemove === voucher.id}
                                            className="modal-react custom-modal-react"
                                            ariaHideApp={false}
                                        >
                                            <div className="modal-body-react" >
                                                <div className="close-modal" onClick={() => setShowModalRemove(false)}>
                                                    <i className="far fa-times-circle"></i>
                                                </div>
                                                <div>
                                                    <div>Bạn có chắc chắn xóa không ?</div>
                                                    <div className="modal-btn">
                                                        <button type="button" className="btn btn-danger btn-modal-remove" onClick={() => handleDeleteVoucher(voucher)}>Chắc chắn</button>
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

                </table>}



                {showVoucherPremium && <table class="table" style={{ display: '"inline-block' }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '5%' }}>STT</th>
                            <th scope="col" style={{ width: '5%' }}>ID</th>
                            <th scope="col">NGÀY TẠO</th>
                            <th scope="col">NGÀY CẬP NHẬT</th>
                            <th scope="col">GIÁ TRỊ (%)</th>
                            <th scope="col">ĐIỀU KIỆN</th>
                            <th scope="col" style={{ width: '7%' }}>Tùy chọn</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" readOnly={true} value={0} class="form-control" /></td>
                            <td><input type="text" value={data.id} readOnly={true} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control"></input></td>
                            <td><input type="text" value={data.disCount} onChange={(e) => setData({ ...data, disCount: e.target.value })} class="form-control" /></td>
                            <td><input type="text" value={data.condition} onChange={(e) => setData({ ...data, condition: e.target.value })} class="form-control"></input></td>
                            <td><button type="button" className='btn-add btn btn-success' onClick={() => onClickButton(buttonUpdate)} >{buttonUpdate ? "Sửa" : (<><i className="fas fa-plus" />Thêm mới</>)}</button></td>
                        </tr>
                        {
                            voucherPremium.map((voucher, index) => {
                                var createdAt = new Date(parseFloat(voucher.createdAt));
                                var updatedAt = new Date(parseFloat(voucher.updatedAt));
                                return (
                                    <>
                                        <tr>
                                            <th scope="row" key={index}>{index + 1}</th>
                                            <td>{voucher.id}</td>
                                            <td>{createdAt.toLocaleString()}</td>
                                            <td>{updatedAt.toLocaleString()}</td>
                                            <td>{voucher.disCount}</td>
                                            <td>{voucher.condition}</td>
                                            <div>
                                                <button 
                                                    className='btn-update btn btn-warning px-3'
                                                    onClick={() => { setData({ id: voucher.id, disCount: voucher.disCount, condition: voucher.condition }); setButtonUpdate(true); }}
                                                >
                                                <i class="fas fa-edit"></i>
                                                </button>
                                                <button 
                                                    onClick={() => { setShowModalRemove(voucher.id) }}
                                                    className='btn-remove btn btn-danger btn-sm mt-2'
                                                >
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>
                                                
                                            </div>
                                        </tr>

                                        <Modal
                                            isOpen={showModalRemove === voucher.id}
                                            className="modal-react custom-modal-react"
                                            ariaHideApp={false}
                                        >
                                            <div className="modal-body-react" >
                                                <div className="close-modal" onClick={() => setShowModalRemove(false)}>
                                                    <i className="far fa-times-circle"></i>
                                                </div>
                                                <div>
                                                    <div>Bạn có chắc chắn xóa không ?</div>
                                                    <div className="modal-btn">
                                                        <button type="button" className="btn btn-danger btn-modal-remove" onClick={() => handleDeleteVoucher(voucher)}>Chắc chắn</button>
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
                </table>}
            </div>
            <Footer />
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        voucher: state.Voucher,
        voucherPremium: state.VoucherPremium
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addVoucher: (voucher) => dispatch(addVoucher(voucher)),
        updateVoucher: (id, data) => dispatch(updateVoucher(id, data)),
        removeVoucher: (id) => dispatch(removeVoucher(id)),
        addVoucherPremium: (voucher) => dispatch(addVoucherPremium(voucher)),
        updateVoucherPremium: (id, data) => dispatch(updateVoucherPremium(id, data)),
        removeVoucherPremium: (id) => dispatch(removeVoucherPremium(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Voucher)