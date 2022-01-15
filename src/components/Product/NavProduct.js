
import { Link } from 'react-router-dom'
import '../../style/Product/NavProduct.css'
import {history} from '../../router/AppRouter'
const NavProduct = ({linkPro}) => {
    const linkProduct = history.location.pathname
    var newLink = linkProduct.slice(1,linkProduct.length)
    if( newLink === "dress") {
        newLink = "Đầm"
    }
    if( newLink === "shirt") {
        newLink = "Áo"
    }
    if( newLink === "trousers") {
        newLink = "Quần"
    }
    if( newLink === "skirt") {
        newLink = "Chân Váy"
    }
    if( newLink === "product") {
        newLink = "Sản phẩm"
    }
    if( newLink === "accessory") {
        newLink = "Phụ kiện"
    }
    // const handleNavProduct = (item) => {
    //     return `detail/${item.codePro}` === newLink
    // }
    // if(newLink === ) {
    //     newLink = product.find((item) => handleNavProduct(item)).name
    // }
    return (
        <div>
            <ul className="itemscope">
                <li>
                    <Link to="/">Trang chủ</Link>
                </li>
                <li>
                    <Link to="/product">Danh mục sản phẩm</Link>
                </li>
                <li>
                    <Link to={linkProduct} className="link-product">{linkPro || newLink}</Link>
                </li>
            </ul>

            <div className="wrap-collection-title row">
                <div className="col-6">
                    <span className="Mot">Sản phẩm</span>
                    <ul className="menuCollection">
                        <li>
                            <Link to="/dress" className={`header-nav-content-item-link ${newLink === "Đầm" && "is-active"}`} >Đầm</Link>
                        </li>
                        <li>
                            <Link to="/shirt" className={`header-nav-content-item-link ${newLink === "Áo" && "is-active"}`}>Áo</Link>
                        </li>
                        <li>
                            <Link to="/skirt" className={`header-nav-content-item-link ${newLink === "Chân Váy" && "is-active"}`}>Chân váy</Link>
                        </li>
                        <li>
                            <Link to="/trousers" className={`header-nav-content-item-link ${newLink === "Quần" && "is-active"}`}>Quần</Link>
                        </li>
                        <li>
                            <Link to="/accessory" className={`header-nav-content-item-link ${newLink === "Phụ kiện" && "is-active"}`}>Phụ kiện</Link>
                        </li>
                    </ul>
                </div>
                <div className="col-6">
                    
                </div>
            </div>
        </div>
    )
}
export default NavProduct
