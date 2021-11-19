import '../../style/Product/Product.css'
import format_curency from '../../utils/displayPrice'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NavHeader from '../HomePage/NavHeader'
import NavProduct from './NavProduct'
import FindShop from '../HomePage/FindShop'
import Footer from '../HomePage/Footer'
const ProShirt = ({shirt} ) => {
    return (
            <div>
                <NavHeader />
                <div className="main-body">
                    <NavProduct />  
                    <div className="collection-body container"> 
                        <div className="product-list row">
                                {shirt.map((item,index) => {
                                    return  (
                                        <div className="product col-3" key={index}> 
                                            <Link to="/">
                                                <div className="product-img">
                                                    <img className="img-change" src={item.img[0]} alt=""/>
                                                    <img className="img-after-change" src={item.img[1]} alt=""/>       
                                                    {item.id % 2 === 0 && <img className="new-arrivals" src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png" alt=""/>}
                                                    <img className="best-seller" src="https://file.hstatic.net/200000000133/file/labels-final_b1d9901b63944df28810efb035e03fcb.png" alt=""/>
                                                </div>
                                            </Link>
                                            <div className="product-detail">
                                                <Link to="/">{item.name}</Link>
                                                <div>
                                                    <span style={{fontSize: "13px"}}>{format_curency(item.price)}đ</span>
                                                </div>
                                            </div>      
                                        </div>
                                    )
                                })}
                                
                        </div>
                    </div>
                </div>
                <FindShop />
                <Footer />
            </div>
        )
    }
 
const mapStateToProps = (state)  => {
    return {
        shirt: state.Shirt,
    }
}

export default connect(mapStateToProps)(ProShirt)