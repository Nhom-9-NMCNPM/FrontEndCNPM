import '../../style/Product/Product.css'
import {connect} from 'react-redux'
import format_curency from '../../utils/displayPrice';
import { Link } from 'react-router-dom';
const Product2Left = ({shirt, sale}) => {
    return (
        <div>
            <div className="product-list row">
                    {shirt.map((item, index) => {
                        return (index === 0) && (
                            <div className="product col-6" key={item}> 
                                <Link to={`/detail/${item.codePro}`}>
                                    <div className="product-img">
                                        <img className="img-change" src={item.img[0]} alt=""/>
                                        <img className="img-after-change" src={item.img[1]} alt=""/>       
                                        <img className="new-arrivals" src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png" alt=""/>
                                        <img className="best-seller" src="https://file.hstatic.net/200000000133/file/labels-final_b1d9901b63944df28810efb035e03fcb.png" alt=""/>
                                    </div>
                                </Link>
                                <div className="product-detail">
                                    <Link to={`/detail/${item.codePro}`}>{item.name}</Link>
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
                    <div className="product col-6">
                        <div className="row">
                            {shirt.map((item,index) => {
                                return ( index >= 1 && index <= 3) && (
                                    <div className="product col-4" key={index}> 
                                        <Link to={`/detail/${item.codePro}`}>
                                            <div className="product-img">
                                                <img className="img-change" src={item.img[0]} alt=""/>
                                                <img className="img-after-change" src={item.img[1]} alt=""/>       
                                                <img className="new-arrivals" src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png" alt=""/>
                                            </div>
                                        </Link>
                                        <div className="product-detail">
                                            <Link to={`/detail/${item.codePro}`}>{item.name}</Link>
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
                        </div>
                        <div className="row" style={{marginTop:" 92px",}}>
                            {shirt.map((item,index) =>  {
                                return (index > 3 && index < 6) &&  (
                                    <div className="product col-6" key={index}> 
                                        <Link to={`/detail/${item.codePro}`}>
                                            <div className="product-img">
                                                <img className="img-change" src={item.img[0]} alt=""/>
                                                <img className="img-after-change" src={item.img[1]} alt=""/>       
                                                <img className="new-arrivals" src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png" alt=""/>
                                            </div>
                                        </Link>
                                        <div className="product-detail">
                                            <Link to={`/detail/${item.codePro}`}>{item.name}</Link>
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
                        </div>
                    </div>
                </div>
        </div>
    )
}

const mapStateToProps = (state)  => {
    return {
        shirt : state.Shirt,
        sale: state.Event
    }
}
export default (connect)(mapStateToProps)(Product2Left)