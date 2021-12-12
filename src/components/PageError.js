import { Link } from "react-router-dom"
import "../style/NotFound.css"
const PageError = () =>  {
    return (
        <div>
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>PAGE NOT FOUND!</h2>
                <p>Chúng tôi thành thật xin lỗi về sự cố này</p>
                <Link to="/">TRỞ LẠI TRANG CHỦ</Link>
            </div>
        </div>
        </div>
    )
}
export default PageError