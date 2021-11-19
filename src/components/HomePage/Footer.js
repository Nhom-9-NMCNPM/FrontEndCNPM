import "../../style/HomePage/Footer.css"
import "../../style/HomePage/responsive.css"
import { useEffect } from "react"
import { Link } from "react-router-dom"
const Footer = () => {
    useEffect(() => {
        const signForm = document.querySelector('.sign-up-form')

        signForm.addEventListener("focusin", () => {
            signForm.classList.add("active1")
        })
        signForm.addEventListener("focusout", ()=> {
        signForm.classList.remove("active1")
         })
    },[])
    return (
        <div>
                <div className="footer">
                    <div className="about-us">
                        <div className="about">
                            <div className="about-list">
                                <ul>
                                    <li className="about-item title">Tuyển dụng</li>
                                    <li className="about-item"><Link to="/">Tuyển dụng Tháng 12/2020</Link></li>
                                    <li className="about-item"><Link to="/">Tuyển dụng tháng 07/2020</Link></li>
                                    <li className="about-item"><Link to="/">Thông tin tuyển dụng tháng 02/2021</Link></li>
                                </ul>
                            </div>
                            <div className="about-list">
                                <ul>
                                    <li className="about-item title">Khám phá EDE</li>
                                    <li className="about-item"><Link to="/">Về chúng tôi</Link></li>
                                    <li className="about-item"><Link to="/">Câu hỏi thường gặp</Link></li>
                                    <li className="about-item"><Link to="/">Tin tức</Link></li>
                                    <li className="about-item"><Link to="/">Sự kiện</Link></li>
                                    <li className="about-item"><Link to="/">Sao & Eva</Link></li>
                                    <li className="about-item"><Link to="/">Mix & Match</Link></li>
                                </ul>
                            </div>
                            <div className="about-list">
                                <ul>
                                    <li className="about-item title">Chính sách</li>
                                    <li className="about-item"><Link to="/">Chính sách thanh toán</Link></li>
                                    <li className="about-item"><Link to="/">Chính sách vận chuyển</Link></li>
                                    <li className="about-item"><Link to="/">Chính sách đổi trả</Link></li>
                                    <li className="about-item"><Link to="/">Chính sách bảo mật</Link></li>
                                    <li className="about-item"><Link to="/">Chương trình thẻ VIP</Link></li>
                                    <li className="about-item"><Link to="/">Hướng dẫn chọn size</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="sign-up">
                            <div className="sign-up-title">
                                <h4>ĐĂNG KÝ NHẬN TIN TỨC VÀ ƯU ĐÃI CỦA EDE</h4>
                            </div>
                            <div className="sign-up-content">
                                <div className="sign-up-des">
                                    <p>Bằng cách đăng ký, bạn đồng ý với chính sách bảo mật của chúng tôi</p>
                                </div>
                                <div className="sign-up-form ">
                                    <input type="email" required id="email" />
                                    <label for="email" className="input-placeholder">Nhập email của bạn</label>
                                    <button className="submit-btn" type="submit">
                                        <i className="fa fa-angle-right" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact">
                        <Link to="/"><i className="fa fa-facebook " aria-hidden="true"></i></Link>
                        <Link to="/"><i className="fa fa-instagram " aria-hidden="true"></i></Link>
                        <Link to="/"><i className="fa fa-youtube " aria-hidden="true"></i></Link>
                        <Link to="/"><i className="fa fa-twitter " aria-hidden="true"></i></Link>
                        <Link to="/"><i className="fa fa-weixin" aria-hidden="true"></i></Link>

                    </div>
                    <div className="address">
                        <div className="address-left">
                            <div className="address-title">
                                Công ty TNHH Mỹ Phục
                            </div>
                            <div className="address-content">
                                0104972419 - Ngày cấp: 27/10/2010 - Nơi cấp: Sở kế hoạch và đầu tư Hà Nội
                                <br />
                                Trụ sở chính: Phòng 208.2, Trung Tâm Thương Mại VinCom Galleriers, số 114 Mai Hắc Đế, Phường Lê Đại
                                Hành, Quận Hai Bà Trưng, Thành phố Hà Nội
                            </div>
                        </div>
                        <div className="address-right">
                            <div className="address-copyright">
                                @ 2021 Eva de Eva
                            </div>
                            <div className="address-tem">
                                <Link to="/">
                                    <img src="https://theme.hstatic.net/200000000133/1000569834/14/logo-bct.png?v=5160" alt="anh" />
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default Footer