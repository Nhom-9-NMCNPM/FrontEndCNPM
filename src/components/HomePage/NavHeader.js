import '../../style/HomePage/responsive.css'
import '../../style/HomePage/Header.css'
import { Link } from 'react-router-dom'
import {useEffect} from 'react'
import {connect} from 'react-redux'
import format_curency from '../../utils/displayPrice';
import {logout, startLogin, stopLogin} from'../../actions/user';
import {removeCart} from '../../actions/cart'
const NavHeader = ({user,cart, removeCart,logout}) => {

    useEffect(() => {
        const headerNav = document.querySelector('.header-nav')
        const headerSub = document.querySelector('.header__cart-list')
        let sticky = headerNav.offsetTop
        window.addEventListener("scroll", () => {
            handleHeaderNav()
            
        })

        const handleHeaderNav = () => {
            if (window.pageYOffset >= sticky) {
                headerNav.classList.add("sticky")
                if(!user.admin) {
                    headerSub.style.top = "40px"
                }
            } else {
                headerNav.classList.remove("sticky")
                if(!user.admin) {
                    headerSub.style.top = "46px"
                }
            }
        }
    }, [])
    return (
        <div>
            <div className="header">
                <div className="header-info">
                   <Link to="/" className="header-info-add">Hệ thống <span>36</span> Store - Mua hàng Online (08h30-17h30 từ
                        T2-T7)
                        <span> 1800 1732 </span> - CSKH (08h30-17h30 từ T2-T7)  <span> 1800 1731</span></Link>
                   <Link to="/" className="header-info-csbh">Chính sách bán hàng</Link>
                </div>
                <div className="header-nav">
                    <div className="header-logo">
                       <Link to="/">
                            <img alt="anh" src="https://file.hstatic.net/1000358207/file/logo_eva.svg" className="header-logo-img" />
                        </Link>
                        
                    </div>

                    <div className="header-nav-main" >
                        <ul className="header-nav-content">
                            <li className="header-nav-content-item">
                               {user.admin ?<Link to="/admin-skirt" className="header-nav-content-item-link" title="VÁY">VÁY</Link> :<Link to="/" className="header-nav-content-item-link" title="Hàng mới về">HÀNG MỚI VỀ</Link>}
                            </li>
                            <li className="header-nav-content-item hasItemMenu">
                                {user.admin ? <Link to="/admin-trousers" className="header-nav-content-item-link" title="QUẦN">QUẦN</Link>  :         <>       <Link to="/product" className="header-nav-content-item-link" title="Sản phẩm">SẢN PHẨM</Link>
                                <div className="header-sub-nav">
                                    <div className="sub-nav-list">
                                        <ul>
                                            <li className="sub-nav-item">
                                               <Link to="/dress">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_1.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Đầm</span>
                                                </Link>
                                            </li>
                                            <li className="sub-nav-item ">
                                               <Link to="/shirt">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_2.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Áo</span>
                                                </Link>
                                            </li>
                                            <li className="sub-nav-item ">
                                               <Link to="/skirt">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_6.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Chân váy</span>
                                                </Link>
                                            </li>
                                            <li className="sub-nav-item ">
                                               <Link to="/trousers">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_7.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Quần</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </div></>}
                            </li>
                            <li className="header-nav-content-item">
                               {user.admin ? <Link to="/admin-shirt" className="header-nav-content-item-link" title="ÁO">ÁO</Link> :<Link to="/" className="header-nav-content-item-link" title="Ưu đãi">ƯU ĐÃI</Link>}
                            </li>
                            
                            <li className="header-nav-content-item">
                               {user.admin ? <Link to="/admin-dress" className="header-nav-content-item-link" title="ĐẦM">ĐẦM</Link>:<Link to="/" className="header-nav-content-item-link" title="Phụ kiện">PHỤ KIỆN</Link>}
                            </li>

                        </ul>
                    </div>

                    {user.admin ?  <div>
                        <div className="admin-login">Quản lý cửa hàng
                        <span><button onClick={logout}>ĐĂNG XUẤT</button></span>
                        </div>
                        
                    </div>  :<div className="header-nav-right">
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
                           <Link to="#" title="Giỏ hàng">
                               
                                <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/bagIcon2.png?v=5127"
                                    title="Giỏ hàng" className="header-cart-img" />
                            </Link>
                            <div className="count-product">{cart.length}</div>
                            <div className="header__cart-list">
                                {( cart.length === 0)  ? 
                                     (   <>
                                        
                                        <i className="fas fa-cart-arrow-down no--cart"></i>
                                        <span className="header__cart-list--no-cart-msg">
                                            Chưa có sản phẩm
                                        </span> 
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <h4 className="header__cart-heading">Sản phẩm đã thêm</h4>
                                        <ul className="header__cart-list-item">
                                        {cart.map((item,index) => {
                                            return (
                                                <li className="header__cart-item" key={index}>
                                                    <img src={item.img[0]} alt="" className="header__cart-img"/>
                                                    <div className="header__cart-item-info">
                                                        <div className="header__cart-item-head">
                                                            <h5 className="header__cart-item-name">{item.name}</h5>
                                                            <div className="header__cart-item-price-wrap">
                                                                <span className="header__cart-item-price">{format_curency(item.price)}đ</span>
                                                                <span className="header__cart-item-multiply">x</span>
                                                                <span className="header__cart-item-qnt">{item.count}</span>
                                                            </div>
                                                        </div>

                                                        <div className="header__cart-item-body">
                                                            <span className="header__cart-item-description">
                                                                Phân loại: {item.color}      Size: {item.size}
                                                            </span>
                                                            <span className="header__cart-item-remove" onClick={() => removeCart(item.id, item.size)}>Xóa</span>
                                                        </div>
                                                    </div>
                                                </li>

                                            )
                                        })}
                                        <li className="cart-checkout">
                                            <button>ĐẶT HÀNG</button>
                                        </li>
                                    </ul></>
                                    )
                                }

                            </div>
                        </div>
                    </div>}
                </div>
                
             </div>
        </div>
    )
}   
const mapStateToProps = (state)  => {
    return {
        user: state.User,
        cart: state.Cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeCart : (id,size) => dispatch(removeCart(id,size)),
        logout : () => dispatch(stopLogin())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);