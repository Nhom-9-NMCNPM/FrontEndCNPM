import NavHeader from "../../components/HomePage/NavHeader"
import { connect } from "react-redux"
import { useState } from "react";
import { addEvent, removeEvent, updateEvent } from "../../actions/event";
import { showSuccessToast } from "../../utils/displayToastMess";
import { useMutation, gql } from "@apollo/client";
import Modal from "react-modal"
import LoadingPage from "../../components/LoadingPage";




const ADD_EVENT = gql`
mutation CreateSales($disCount: Int!, $publish: Boolean!) {
    createSales(disCount: $disCount, publish: $publish) {
      id
      createdAt
      updatedAt
      disCount
      publish
    }
  }
`
const DELETE_EVENT = gql`
mutation Mutation($deleteSaleId: Int!) {
  deleteSale(id: $deleteSaleId) {
    id
  }
}
`
const APPLY_EVENT = gql`
mutation Mutation($updateSalesId: Int!, $data: updateSalesInput!) {
  updateSales(id: $updateSalesId, data: $data) {
    id
    publish
  }
}
`

const Event = ({ events, addEvent, removeEvent, updateEvent }) => {
    const [data, setData] = useState("");
    const [showModalRemove, setShowModalRemove] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteEvent] = useMutation(DELETE_EVENT, {
        onCompleted: (data) => {
            removeEvent(data.deleteSale.id);
        }
    })
    const [add] = useMutation(ADD_EVENT, {
        onCompleted: (data) => {
            addEvent(data.createSales)
        }
    })
    const [applyEvent] = useMutation(APPLY_EVENT, {
        onCompleted: (data) => {
            updateEvent(data.updateSales.id, data.updateSales.publish)
        }
    })
    const handleAddButtonClick = async () => {

        if (data === "" || data === 0 || data<0) {
            showSuccessToast("Vui lòng kiểm tra lại giá trị!", 'Cảnh báo!', 'error')
        }else{
            setIsLoading(true);
            await add({
                variables: {
                        disCount: parseInt(data),
                        publish: false
                }
            })
            setIsLoading(false);
            showSuccessToast("Thêm thành công!")
            setData("");
        }
        
    }
    const handleDeleteEvent = async (data) => {
        setIsLoading(true)
        await deleteEvent({
            variables:{
                deleteSaleId: data.id
            }
        })
        setIsLoading(false);
        showSuccessToast("Xóa thành công")
    }
    const selectEvent = async (id) => {
        const currentEvent = events.find(event => event.publish === true);
        setIsLoading(true);
        await applyEvent({
            variables:{
                updateSalesId: id,
                data: {
                    publish: true,
                }
            }
        })
        await applyEvent({
            variables: {
                updateSalesId: currentEvent.id,
                data: {
                    publish: false
                }
            }
        })
        setIsLoading(false);
        showSuccessToast("Áp dụng thành công!")

    }
    if(isLoading) return <LoadingPage />;
    return (
        <div>
            <NavHeader event={true} />
            <div className="margin-bottom table-product">
                <div className="table-title-revenue">
                    <h1>SỰ KIỆN</h1>
                </div>
                <table className="table mt-2" style={{ display: '"inline-block' }}>
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '5%' }}>STT</th>
                            <th scope="col" style={{ width: '5%' }}>ID</th>
                            <th scope="col">NGÀY TẠO</th>
                            <th scope="col">NGÀY CẬP NHẬT</th>
                            <th scope="col">GIÁ TRỊ (%)</th>
                            <th scope="col">TRẠNG THÁI</th>
                            <th scope="col" style={{ width: '7%' }}>Tùy chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" readOnly={true} value={0} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control"></input></td>
                            <td><input type="text" class="form-control" value={data} onChange={(e) => setData(e.target.value)} /></td>
                            <td><input type="text" readOnly={true} value={"Chưa áp dụng"} class="form-control" /></td>
                            <td><button type="button" className='btn-add btn btn-success' onClick={handleAddButtonClick}>Thêm mới</button></td>
                        </tr>
                        {
                            events.map((data, index) => {
                                var createdAt = new Date(parseFloat(data.createdAt));
                                var updatedAt = new Date(parseFloat(data.updatedAt));
                                
                                return (
                                    <>
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td className='content'>{data.id}</td>
                                        <td className='content'>{createdAt.toLocaleString()}</td>
                                        <td className='content'>{updatedAt.toLocaleString()}</td>
                                        <td className='content'>{data.disCount}</td>
                                        <td className='content'>{data.publish ? "Đang áp dụng" : "Chưa áp dụng"}</td>
                                        <td className='content' style={{ paddingLeft: '20px', paddingRight: '20px', height: '7rem'}}>
                                            <div>
                                                {!data.publish&&<button
                                                    className='btn-update btn btn-warning px-3 fw-bold'
                                                    onClick={()=>{selectEvent(data.id)}}
                                                >
                                                    Áp dụng
                                                </button>}
                                                {!data.publish&&<button
                                                    onClick={() => { setShowModalRemove(data.id) }}
                                                    className='btn-remove btn btn-danger btn-sm mt-2'
                                                >
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>}

                                            </div>
                                        </td>
                                    </tr>
                                    <Modal
                                            isOpen={showModalRemove === data.id}
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
                                                        <button type="button" className="btn btn-danger btn-modal-remove" onClick={() => handleDeleteEvent(data)}>Chắc chắn</button>
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
    )
}


const mapStateToProps = (state) => {
    return {
        events: state.Events,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addEvent: (data) => dispatch(addEvent(data)),
        removeEvent: (id) => dispatch(removeEvent(id)),
        updateEvent: (id, data) => dispatch(updateEvent(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)