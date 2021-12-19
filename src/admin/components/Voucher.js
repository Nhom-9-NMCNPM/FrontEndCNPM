import Footer from "../../components/HomePage/Footer"
import NavHeader from "../../components/HomePage/NavHeader"
import { connect } from "react-redux"
import { useState } from "react";
import { addVoucher, updateVoucher, removeVoucher } from '../../actions/voucher';
import format_curency from "../../utils/displayPrice";
import { useMutation, gql } from "@apollo/client";
import LoadingPage from "../../components/LoadingPage";
import { Redirect } from "react-router";
import { updateHistoryOrder } from "../../actions/order";

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
`;

const Voucher = ({ voucher, addVoucher }) => {

    const [showVoucher, setShowVoucher] = useState(true)
    const [showVoucherPremium, setVoucherPremium] = useState(false)
    const handleShowVoucher = () => {
        setShowVoucher(true);
        setVoucherPremium(false);
    }
    const handleShowVoucherPremium = () => {
        setShowVoucher(false);
        setVoucherPremium(true);
    }

    const [data, setData] = useState({ disCount: 0, condition: 0 })
    const [add] = useMutation(ADD_VOUCHER, {
        onCompleted: (data) => {
            addVoucher(data.createVoucher)
        }
    }
    )

    const handleAddVoucher = () => {
        if (data.disCount === 0) {
            alert("Vui lòng nhập lại!")
        }
        else {
            add({
                variables: {
                    data: {
                        disCount: parseInt(data.disCount),
                        condition: parseInt(data.condition)
                    }
                }
            })
            setData(
                {
                    disCount: 0,
                    condition: 0
                }
            )
        }

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
                        </tr>
                    </thead>
                    <tbody>
                        {
                            voucher.map((voucher, index) => {
                                var createdAt = new Date(parseFloat(voucher.createdAt));
                                var updatedAt = new Date(parseFloat(voucher.updatedAt));
                                return (
                                    <tr>
                                        <th scope="row" key={index}>{index + 1}</th>
                                        <td>{voucher.id}</td>
                                        <td>{createdAt.toLocaleString()}</td>
                                        <td>{updatedAt.toLocaleString()}</td>
                                        <td>{voucher.disCount}</td>
                                        <td>{voucher.condition}</td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td><input type="text" readOnly={true} value={voucher.length + 1} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control" /></td>
                            <td><input type="text" readOnly={true} class="form-control"></input></td>
                            <td><input type="text" value={data.disCount} onChange={(e) => setData({ ...data, disCount: e.target.value })} class="form-control" /></td>
                            <td><input type="text" value={data.condition} onChange={(e) => setData({ ...data, condition: e.target.value })} class="form-control"></input></td>
                        </tr>
                    </tbody>
                </table>}
                <button type="button" class="btn btn-success " style={{ float: 'right', marginRight: '20px' }} onClick={handleAddVoucher}>Thêm</button>


                {showVoucherPremium && <table class="table" style={{ display: '"inline-block' }}>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">NGÀY BẮT ĐẦU</th>
                            <th scope="col">NGÀY HẾT HẠN</th>
                            <th scope="col">ĐIỀU KIỆN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
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
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addVoucher: (voucher) => dispatch(addVoucher(voucher)),
        updateVoucher: (id, data) => dispatch(updateVoucher(id, data)),
        removeVoucher: (id) => dispatch(removeVoucher(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Voucher)