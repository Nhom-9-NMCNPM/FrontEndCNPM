import "../../style/User/NavUser.css"
import "../../style/HomePage/responsive.css"
import { Link } from "react-router-dom"
const NavUser = () => {
    return (
        <div>
            <div className="user">
                <ol className="user-nav">
                    <li>
                        <Link to ="/">Trang chủ</Link>
                    </li>
                    <li className="user-account">
                        <Link to ="/account">Tài khoản</Link>
                    </li>
                </ol>
            </div>
        </div>
    )
}

export default NavUser