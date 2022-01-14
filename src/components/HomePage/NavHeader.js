import '../../style/HomePage/responsive.css'
import '../../style/HomePage/Header.css'
import { Link } from 'react-router-dom'
import {useEffect,useState } from 'react'
import {connect} from 'react-redux'
import format_curency from '../../utils/displayPrice';
import {logout, startLogin, stopLogin} from'../../actions/user';
import {removeCart} from '../../actions/cart'
import User from '../User'
import { showSuccessToast } from '../../utils/displayToastMess'
const NavHeader = ({user,cart, removeCart,logout, product, search = true, showPro, showUser, showOrder, sale, voucher,event}) => {
    const [inputSearch, setInputSearch] = useState('')
    const [showResult, setShowResult] = useState(false)  
    const resultArray = product.filter((item) => {
        return item.name.toLowerCase().indexOf(inputSearch.toLowerCase()) !== -1
    })
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
    }, [user.admin])
    useEffect(() => {
        if(inputSearch.length > 0) {
            setShowResult(true)
        } 
        else (
            setShowResult(false)
        )
    },[inputSearch.length])
    const handleInputSearch = (e) => {
        setInputSearch(e)
    }
    return (
        <div>
            <div className="header">
                <div className="header-info">
                   <Link to="/" className="header-info-add">Hệ thống <span>36</span> Store - Mua hàng Online (08h30-17h30 từ
                        T2-T7)
                        <span> 1800 1732 </span> - CSKH (08h30-17h30 từ T2-T7)  <span> 1800 1731</span></Link>
                   {user.admin ? <span className="header-info-csbh">Đăng nhập với tư cách quản trị viên</span> : <Link to="/" className="header-info-csbh">Chính sách bán hàng</Link>}
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
                               {!user.admin && <Link to="/" className="header-nav-content-item-link" title="Hàng mới về">HÀNG MỚI VỀ</Link>}
                            </li>
                            <li className="header-nav-content-item hasItemMenu">
                                {user.admin ? <Link to="/admin-skirt" className={`header-nav-content-item-link ${showPro && "is-active"}`} title="Sản phẩm">SẢN PHẨM</Link> : <Link to="/product" className={`header-nav-content-item-link ${showPro && "is-active"}`} title="Sản phẩm">SẢN PHẨM</Link>}
                                <div className="header-sub-nav">
                                    <div className="sub-nav-list">
                                        <ul>
                                            <li className="sub-nav-item">
                                                {user.admin ? <Link to="/admin-dress">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_1.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Đầm</span>
                                                </Link> : <Link to="/dress">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_1.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Đầm</span>
                                                </Link> }
                                               
                                            </li>
                                            <li className="sub-nav-item ">
                                                {user.admin ?  <Link to="/admin-shirt">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_2.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Áo</span>
                                                </Link> :  <Link to="/shirt">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_2.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Áo</span>
                                                </Link>}
                                            </li>
                                            <li className="sub-nav-item ">
                                                {user.admin ?  <Link to="/admin-skirt">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_6.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Chân váy</span>
                                                </Link> :  <Link to="/skirt">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_6.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Chân váy</span>
                                                </Link>}
                                            </li>
                                            <li className="sub-nav-item ">
                                                {user.admin ?  <Link to="/admin-trousers">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_7.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Quần</span>
                                                </Link> :  <Link to="/trousers">
                                                    <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/img_megamenu3_7.jpg?v=5127"
                                                        className="sub-nav-item-img" />
                                                    <span className="sub-nav-info">Quần</span>
                                                </Link>}
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </li>
                            {!user.admin && <>
                                <li className="header-nav-content-item">
                               {!user.admin && <Link to="/" className="header-nav-content-item-link" title="Phụ kiện" onClick={()=>showSuccessToast("Tính năng này hiện chưa được phát triển, vui lòng thử lại sau","Thông báo!", "error")} >PHỤ KIỆN</Link>}
                            </li>
                            
                            <li className="header-nav-content-item">
                               {!user.admin && <Link to="/" className="header-nav-content-item-link" title="Ưu đãi" onClick={()=>showSuccessToast("Tính năng này hiện chưa được phát triển, vui lòng thử lại sau","Thông báo!", "error")}>ƯU ĐÃI</Link>}
                            </li>
                            </> }
                            <li className="header-nav-content-item">
                               {user.admin && <Link to="/admin-user" className={`header-nav-content-item-link ${showUser && "is-active"}`} title="ĐẦM">NGƯỜI DÙNG</Link>}
                            </li>
                            <li className="header-nav-content-item">
                               {user.admin && <Link to="/admin-order" className={`header-nav-content-item-link ${showOrder && "is-active"}`} title="ORDER">ĐƠN HÀNG</Link>}
                            </li>
                            <li className="header-nav-content-item">
                               {user.admin && <Link to="/admin-voucher" className={`header-nav-content-item-link ${voucher && "is-active"}`} title="VOUCHER">VOUCHER</Link>}
                            </li>
                            <li className="header-nav-content-item">
                               {user.admin && <Link to="/admin-event" className={`header-nav-content-item-link ${event && "is-active"}`} title="SỰ KIỆN" >SỰ KIỆN</Link>}
                            </li>
                        </ul>
                    </div>

                    {user.admin ?  
                        <div className="admin-login">
                            
                            <span onClick={logout} className="admin-log-out"><i class="fas fa-sign-out-alt"></i></span>
                        </div>
                        
                    :
                    <div className="header-nav-right">
                        {search && <div className="header-search-product">
                            <div className="admin-search">
                                <form action="search" className="header-form-admin">
                                        <input autoFocus={true} type="text" className="header-search-admin" placeholder="Tìm sản phẩm..." value={inputSearch} 
                                        onChange={(e) => {handleInputSearch(e.target.value)}}/>
                                        <div className="close-search"><i class="fas fa-search" /></div>
                                </form>
                                {showResult && <div className="search-result" >
                                    {resultArray.length !== 0 ? (showResult && <div>
                                        {resultArray.map((item,index) => {
                                        return (
                                            <div className="result-item" key={index}>
                                                    <div className="result-img">
                                                        <Link to={`/detail/${item.codePro}`}><img src={item.img[0]} alt=""/></Link>
                                                    </div>
                                                    <div className="result-content">
                                                        <Link to={`/detail/${item.codePro}`} className="result-name-product">{item.name}</Link>
                                                        <p className="result-price">{format_curency(item.price)}đ</p>
                                                        <Link to={`/detail/${item.codePro}`} className="result-detail-pro">Chi tiết</Link>
                                                    </div>
                                            </div>
                                        )
                                       
                                    })}    
                                    </div>) : <div>Không tìm thấy sản phẩm nào</div>
                                    
                                    }                                    
                                 </div> }
                                
                            </div>  
                        </div> }
                        <div className="header-user">
                           <Link to="/account" title="Tài khoản">
                                <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/accountIcon.png?v=5127"
                                    title="Tài khoản" className="header-user-img" />
                            </Link>
                        </div>
                        <div className="header-cart">
                           <Link to="/cart" title="Giỏ hàng">
                               
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
                                                            {
                                                                sale?
                                                                <>
                                                                    <span style={{
                                                                    fontSize: "13px",
                                                                    textDecoration: 'line-through',
                                                                    marginRight: '10px',
                                                                    opacity: '0.6'}}>
                                                                        {format_curency(item.price)}đ
                                                                    </span>
                                                                    <span>{format_curency(parseInt(item.price-item.price*sale/100, 10))}đ</span>
                                                                </>
                                                                :<>
                                                                    <span style={{fontSize: "13px"}}>{format_curency(item.price)}đ</span>
                                                                </>
                                                                
                                                            }
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
                                            <Link to="/cart">
                                                <button>ĐẶT HÀNG</button>
                                            </Link>
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
        product: [
            ...state.Shirt,
            ...state.Skirt,
            ...state.Dress,
            ...state.Trousers
          ],
        sale: state.Event
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeCart : (id,size) => dispatch(removeCart(id,size)),
        logout : () => dispatch(stopLogin())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);