import '../../style/Product/Product.css'
import {connect} from 'react-redux'
import format_curency from '../../utils/displayPrice'
import { Link } from 'react-router-dom'
const Product4 = ({dress ,trousers}, check ) => {
    return (check.value) ?(
            <div>
                <div className="product-list row">
                        {dress.map((item,index) => {
                            return (index <= 3)  && (
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
        )
    :
         (
            <div>
                <div className="product-list row">
                        {trousers.map((item,index) => {
                            return (index <= 3)  && (
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
        )
    }
 

const mapStateToProps = (state)  => {
    return {
        dress: state.Dress,
        trousers: state.Trousers,

    }
}
export default connect(mapStateToProps)(Product4)