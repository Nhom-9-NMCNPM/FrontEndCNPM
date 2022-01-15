import NavHeader from "../../components/HomePage/NavHeader"
import { connect } from "react-redux"
import { useState } from "react";
import { addEvent } from "../../actions/event";
import { showSuccessToast } from "../../utils/displayToastMess";
import { useMutation, gql } from "@apollo/client";



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

const Event = ({ events, addEvent, removeEvent }) => {
    const [data, setData] = useState("");

    const [add] = useMutation(ADD_EVENT, {
        onCompleted: (data) => {
            addEvent(data.createSales)
        }
    })

    const handleAddButtonClick = () => {
        if (data === "" || data === 0) {
            showSuccessToast("Vui lòng điền giá trị!", 'Cảnh báo!', 'error')
        }
        add({
            variables: {
                    disCount: parseInt(data),
                    publish: false
            }
        })
        setData("");
    }

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
                                        <td className='content' style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                            <div>
                                                <button
                                                    className='btn-update btn btn-warning px-3'

                                                >
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button
                                                    className='btn-remove btn btn-danger btn-sm mt-2'
                                                >
                                                    <i class="fas fa-trash-alt"></i>
                                                </button>

                                            </div>
                                        </td>
                                    </tr>


                                   
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
        removeEvent: (id) => dispatch(removeEvent(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Event)