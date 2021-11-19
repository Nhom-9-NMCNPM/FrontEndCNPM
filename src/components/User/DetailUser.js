import "../../style/User/DetailUser.css"
import "../../style/HomePage/responsive.css"
import {connect} from "react-redux";
import {startLogin} from'../../actions/user';
const DetailUser = ({user, login}) => {
    return (
        <div>
            <div className="title-user">
                <h1>Tài khoản của bạn</h1>
                {!user.email&&(<div className="d-inline-block mt-2">
                    <span>Quý khách vui lòng đăng nhập để tiếp tục</span>
                    <button type="button" 
                    className="btn btn-dark addCart mt-2"
                    onClick={login}
                    >
                        Đăng nhập
                    </button>
                </div>)
                }
            </div>
            {
                !!user.email&&(<div className="user-info container">
                    <div className="row">
                        <div className="col-3 user-sidebar">
                            <h3>TÀI KHOẢN</h3>
                            <ul className="user-list">
                                <li>
                                    <a href="/">
                                        Thông tin tài khoản
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        Danh sách địa chỉ
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        Đăng xuất
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-9 user-info-detail">
                            <h3>THÔNG TIN TÀI KHOẢN</h3>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
}
const mapStateToProps = (state)  => {
    return {
        user: state.User,
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        login:()=> dispatch(startLogin()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailUser)