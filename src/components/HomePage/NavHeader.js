import '../../style/HomePage/responsive.css'
import '../../style/HomePage/Header.css'
import { Link } from 'react-router-dom'
import {useEffect} from 'react'
const NavHeader = () => {

    useEffect(() => {
        const headerNav = document.querySelector('.header-nav')
        let sticky = headerNav.offsetTop
        window.addEventListener("scroll", () => {
            handleHeaderNav()
        })

        const handleHeaderNav = () => {
            if (window.pageYOffset >= sticky) {
                headerNav.classList.add("sticky")
            } else {
                headerNav.classList.remove("sticky")
            }
        }
    }, [])
    return (
        <div>
            <div className="header">
                <div className="header-info">
                   <a href="/" className="header-info-add">Hệ thống <span>36</span> Store - Mua hàng Online (08h30-17h30 từ
                        T2-T7)
                        <span> 1800 1732 </span> - CSKH (08h30-17h30 từ T2-T7)  <span> 1800 1731</span></a>
                   <a href="/" className="header-info-csbh">Chính sách bán hàng</a>
                </div>
                <div className="header-nav">
                    <div className="header-logo">
                       <a href="/">
                            <img alt="anh" src="https://file.hstatic.net/1000358207/file/logo_eva.svg" className="header-logo-img" />
                        </a>
                    </div>

                    <div className="header-nav-main">
                        <ul className="header-nav-content">
                            <li className="header-nav-content-item">
                               <Link to="/" className="header-nav-content-item-link" title="Hàng mới về">HÀNG MỚI VỀ</Link>
                            </li>
                            <li className="header-nav-content-item hasItemMenu">
                               <Link to="/product" className="header-nav-content-item-link" title="Sản phẩm">SẢN PHẨM</Link>
                                <div className="header-sub-nav">
                                    <div className="sub-nav-list">
                                        <ul>
                                            <li className="sub-nav-item">
                                               <a href="/">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_1.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Đầm</span>
                                                </a>
                                            </li>
                                            <li className="sub-nav-item ">
                                               <a href="/">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_2.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Áo</span>
                                                </a>
                                            </li>
                                            <li className="sub-nav-item ">
                                               <a href="/">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_6.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Chân váy</span>
                                                </a>
                                            </li>
                                            <li className="sub-nav-item ">
                                               <a href="/">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_7.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Quần</span>
                                                </a>
                                            </li>
                                            <li className="sub-nav-item ">
                                               <a href="/">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_8.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Tất cả sản phẩm</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </li>
                            <li className="header-nav-content-item hasItemMenu">
                               <Link to="/table" className="header-nav-content-item-link" title="Chọn theo dịp">QUẢN LÝ</Link>
                            </li>
                            <li className="header-nav-content-item">
                               <a href="/" className="header-nav-content-item-link" title="Ưu đãi">ƯU ĐÃI</a>
                            </li>
                            
                            <li className="header-nav-content-item">
                               <a href="/" className="header-nav-content-item-link" title="Phụ kiện">PHỤ KIỆN</a>
                            </li>

                        </ul>
                    </div>

                    <div className="header-nav-right">
                        <form action="search" className="header-form">
                            <input type="text" className="header-search" placeholder="Tìm sản phẩm..." />
                            <input type="submit" className="header-search-btn" value="" />
                        </form>
                        <div className="header-user">
                           <Link to="/account" title="Tài khoản">
                                <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/accountIcon.png?v=5127"
                                    title="Tài khoản" className="header-user-img" />
                            </Link>
                        </div>
                        <div className="header-cart">
                           <a href="/" title="Giỏ hàng">
                                <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/bagIcon2.png?v=5127"
                                    title="Giỏ hàng" className="header-cart-img" />
                            </a>
                            <div className="header__cart-list">
                                {/* <img src="./assets/img/no_cart.png" alt="" class="header__cart-list--no-cart-img" />
                                <span class="header__cart-list--no-cart-msg">
                                    Chưa có sản phẩm
                                </span>  */}
                                <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                                    <ul className="header__cart-list-item">
                                        <li className="header__cart-item">
                                            <img src="./assets/img/nike.jpeg" alt="" className="header__cart-img"/>
                                            <div className="header__cart-item-info">
                                                <div className="header__cart-item-head">
                                                    <h5 className="header__cart-item-name">Giày nike</h5>
                                                    <div className="header__cart-item-price-wrap">
                                                        <span className="header__cart-item-price">2.000.000đ</span>
                                                        <span className="header__cart-item-multiply">x</span>
                                                        <span className="header__cart-item-qnt">2</span>
                                                    </div>
                                                </div>

                                                <div className="header__cart-item-body">
                                                    <span className="header__cart-item-description">
                                                        Phân loại: Trắng
                                                    </span>
                                                    <span className="header__cart-item-remove">Xóa</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
}   

export default NavHeader;