import "../../style/User/DetailUser.css"
import "../../style/HomePage/responsive.css"

const DetailUser = () => {
    return (
        <div>
            <div className="title-user">
                <h1>Tài khoản của bạn</h1>
            </div>
            <div className="user-info container">
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
            </div>
        </div>
    )
}

export default DetailUser