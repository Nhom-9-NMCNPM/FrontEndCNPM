import '../../style/Product/Product.css'
import {connect} from 'react-redux'
import format_curency from '../../utils/displayPrice';
const Product2Left = ({shirt}) => {
    return (
        <div>
            <div className="product-list row">
                    {shirt.map((item, index) => {
                        return (index === 1) && (
                            <div className="product col-6" key={item}> 
                                <a href="/">
                                    <div className="product-img">
                                        <img className="img-change" src={item.img[0]} alt=""/>
                                        <img className="img-after-change" src={item.img[1]} alt=""/>       
                                        <img className="new-arrivals" src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png" alt=""/>
                                        <img className="best-seller" src="https://file.hstatic.net/200000000133/file/labels-final_b1d9901b63944df28810efb035e03fcb.png" alt=""/>
                                    </div>
                                </a>
                                <div className="product-detail">
                                    <a href="/">{item.name}</a>
                                    <div>
                                        <span style={{fontSize: "13px",}}>{format_curency(item.price)}đ</span>
                                    </div>
                                </div>      
                            </div>
                        )
                    })}
                    <div className="product col-6">
                        <div className="row">
                            {shirt.map((item,index) => {
                                return ( index >= 1 && index <= 3) && (
                                    <div className="product col-4" key={index}> 
                                        <a href="/">
                                            <div className="product-img">
                                                <img className="img-change" src={item.img[0]} alt=""/>
                                                <img className="img-after-change" src={item.img[1]} alt=""/>       
                                                <img className="new-arrivals" src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png" alt=""/>
                                            </div>
                                        </a>
                                        <div className="product-detail">
                                            <a href="/">{item.name}</a>
                                            <div>
                                                <span style={{fontSize: "13px",}}>{format_curency(item.price)}đ</span>
                                            </div>
                                        </div>      
                                    </div>
                                )
                            })}
                        </div>
                        <div className="row" style={{marginTop:" 92px",}}>
                            {shirt.map((item,index) =>  {
                                return (index > 3 && index < 6) &&  (
                                    <div className="product col-6" key={index}> 
                                        <a href="/">
                                            <div className="product-img">
                                                <img className="img-change" src={item.img[0]} alt=""/>
                                                <img className="img-after-change" src={item.img[1]} alt=""/>       
                                                <img className="new-arrivals" src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png" alt=""/>
                                            </div>
                                        </a>
                                        <div className="product-detail">
                                            <a href="/">{item.name}</a>
                                            <div>
                                                <span style={{fontSize: "13px",}}>{format_curency(item.price)}đ</span>
                                            </div>
                                        </div>      
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
        </div>
    )
}

const mapStateToProps = (state)  => {
    return {
        shirt : state.Shirt,

    }
}
export default (connect)(mapStateToProps)(Product2Left)