import '../../style/Product/Product.css'
import format_curency from '../../utils/displayPrice'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
const Product4 = ({data, sale} ) => {
    return (
            <div>
                <div className="product-list row">
                        {data.map((item,index) => {
                            return (index <= 3)  && (
                                <div className="product col-3" key={index}> 
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
                        
                </div>
            </div>
        )
    }
 
const mapStateToProps = (state)=>{
    return {
        sale: state.Event
    }
}

export default connect(mapStateToProps)(Product4)