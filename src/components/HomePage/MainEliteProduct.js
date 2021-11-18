import '../../style/HomePage/MainEliteProduct.css'
import '../../style/HomePage/responsive.css'
import {connect} from 'react-redux'
import format_curency from '../../utils/displayPrice';
const MainEliteProduct = ({shirt}) => {
   
    return (
        <div>
             <div className="main-elite-product">
                <div className="main-elite-product-title">
                    <h2 className="elite-product-title">
                        <a href="/" title="THE SYMPHONY OF ELITE">
                            THE SYMPHONY OF ELITE
                        </a>
                        <p className="elite-product-view-more">
                            <a href="/" className="Xem tất cả">
                                Xem tất cả
                            </a>
                        </p>
                    </h2>
                </div>
                <div className="main-elite-product-show container-xl">
                    <div className="main-elite-product-show-list row">
                        {
                            shirt.map((item,index)=>{

                                return (index <= 3) && (
                                    <div className="main-elite-product-show-item col-3" key={index}>
                                        <a href="/">
                                            <div className="elite-product-img">
                                                <img src={item.img[0]}
                                                    className="img-change" alt="anh" />
                                                <img
                                                    src={item.img[1]} alt="" />
                                                <div className="elite-product-lable-tag">
                                                    <img src="https://file.hstatic.net/200000000133/file/labels-final_b1d9901b63944df28810efb035e03fcb.png"
                                                        alt="anh" />
                                                </div>
                                            </div>
                                        </a>
                                        <div className="elite-product-content">
                                            <div className="elite-product-content-title">
                                                <a href="/">
                                                    {`${item.name} ${item.codePro}`}
                                                </a>
                                            </div>
                                            <span className="elite-product-content-title-price">{format_curency(item.price)}đ</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
const mapStateToProps = (state) =>{
    return {
        shirt: state.Shirt,
    }
}
export default connect(mapStateToProps)(MainEliteProduct)