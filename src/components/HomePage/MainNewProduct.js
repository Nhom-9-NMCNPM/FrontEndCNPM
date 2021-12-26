import "../../style/HomePage/MainNewProduct.css"
import "../../style/HomePage/responsive.css"
import {connect} from 'react-redux'
import format_curency from '../../utils/displayPrice';
import { Link } from "react-router-dom";
import Slider from "react-slick";
const MainNewProduct = ({product, sale}) => {
    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows:true,
    }
    return (
        <div>
             <div className="main-new-product">
                <div className="main-new-product-title">
                    <h2 className="product-title">
                        <Link to="/product" title="SẢN PHẨM MỚI NHẤT">
                            SẢN PHẨM MỚI NHẤT
                        </Link>
                        <p className="product-view-more">
                            <Link to="/product" className="Xem tất cả">
                                Xem tất cả
                            </Link>
                        </p>
                    </h2>
                </div>
                <Slider className="main-new-product-slide" 
                    {...settings}
                >
                    {product.map((item,index) => {
                        return (index <= 8) && (
                            <div className="new-product-slide-item " data-index={index} key={index}>
                                <Link to={`/detail/${item.codePro}`}>
                                    <div className="new-product-img">
                                        <img src={item.img[0]}
                                            className="img-change" alt="anh"/>
                                        <img src={item.img[1]}
                                            alt="anh" />
                                        <div className="new-product-lable-tag">
                                            <img src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png"
                                                alt="anh" />
                                        </div>
                                    </div>
                                </Link>
                                <div className="new-product-content">
                                    <div className="new-product-content-title">
                                        <Link to={`/detail/${item.codePro}`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    {
                                        sale?
                                        <div>
                                            <span style={{
                                            fontSize: "13px",
                                            textDecoration: 'line-through',
                                            marginRight: '10px',
                                            opacity: '0.6'}}>
                                                {format_curency(item.price)}đ
                                            </span>
                                            <span>{format_curency(parseInt(item.price-item.price*sale/100, 10))}đ</span>
                                        </div>
                                        :<div>
                                            <span style={{fontSize: "13px"}}>{format_curency(item.price)}đ</span>
                                        </div>
                                        
                                    }
                                </div>
                            </div>
                        )
                    })}
                    
                </Slider>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        product: [
            ...state.Shirt,
            ...state.Skirt,
            ...state.Trousers,
            ...state.Dress,
        ],
        sale: state.Event
    }
}
export default connect(mapStateToProps)(MainNewProduct)