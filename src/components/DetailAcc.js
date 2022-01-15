import "../style/detailAcc.css"; // css
import FindShop from "./HomePage/FindShop";
import Footer from "./HomePage/Footer";
import NavHeader from "./HomePage/NavHeader";
import {useState} from 'react';
import {connect} from 'react-redux';
import format_curency from "../utils/displayPrice";
import { Link } from "react-router-dom";
import {addCart} from '../actions/cart';
import "../style/Toast.css"
import NavProduct from "./Product/NavProduct";
import {showSuccessToast} from '../utils/displayToastMess';


const DetailAcc = ({product, match, dispatch, sale}) => { 
  window.scrollTo(0,0)
  const [keyActive, setkeyActive] = useState('')
  const [quantity, setQuantity] = useState(1)
  const detailAcc = product.filter((item) => item.codePro === match.params.code)[0];
  const [activeImg, setActiveImg ] = useState(0)

  const handleAddCart = ()=>{
      if(product.count === 0){
        showSuccessToast("Sản phẩm đã hết, vui lòng chọn sản phẩm khác!","Cảnh báo!", "error")
      }
      else {
      showSuccessToast("Bạn đã thêm vào giỏ hàng", "Thành công!", "success")
      dispatch(addCart({
        id:detailAcc.id,
        name: detailAcc.name,
        img: detailAcc.img,
        color: detailAcc.color,
        codePro: detailAcc.codePro,
        count: quantity,
        size: keyActive,
        price: detailAcc.price,
      }))
      }
    
      
    
  } 
  return (
    <div>
      <NavHeader search={false} showPro={true} />
      <div className="product-container">
        <NavProduct linkPro={detailAcc.name}/>
        <div className="row product">
          <div className="product-images col-7">
            <div className="row">
              <div className="thumbs col-2">
                {detailAcc.img.map((item,index) => {
                  return (
                    <div className={`thumb-item ${parseInt(activeImg ,10) === index && "active-img"}`} onClick={() => setActiveImg(index)} key={index}>
                      <img
                        src={item}
                        alt=""
                      />
                   </div>
                  )
                })}
              </div>
              <div className="main-images col-10">
                <img
                  src={detailAcc.img[parseInt(activeImg, 10)]}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="product-details col-5">
            <h1>{detailAcc.name}</h1>

            <div className="skuProduct">
              <label>SKU:</label>
              <span>{detailAcc.codePro}</span>
            </div>
            {
              sale?
              <div>
                  <span style={{
                  fontSize: "13px",
                  textDecoration: 'line-through',
                  marginRight: '10px',
                  opacity: '0.6'}}>
                      {format_curency(detailAcc.price)}đ
                  </span>
                  <span className="fw-bold" >{format_curency(parseInt(detailAcc.price-detailAcc.price*sale/100, 10))}đ</span>
              </div>
              :<div>
                  <span style={{fontSize: "13px"}}>{format_curency(detailAcc.price)}đ</span>
              </div>
              
          }
            <div className="desProduct">
              <span>Thông tin sản phẩm:</span>
              <p className="des-title">
                {detailAcc.description}
              </p>
              <p>Màu sắc: {detailAcc.color}</p>
              <p>Chất liệu: {detailAcc.material}</p>
            </div>
            <div className="size-area">
                <div className="quantity-area">
                  <div className="btn-minus-quantity" onClick={() => {if(quantity > 0) setQuantity(quantity -1)}} > - </div>
                  <div className="quantity-content">{quantity}</div>
                  <div className="btn-add-quantity" onClick={() => setQuantity(quantity +1)}> + </div>
                </div>
              </div>
            <button type="button" className="btn btn-dark addCart" onClick={handleAddCart} >
              Thêm vào giỏ hàng
            </button>

            <div className="hotlineProduct">
              <span className="titleHotlineProduct">
                Mua hàng Online
                <Link href="/"> 1800 1732 </Link>
              </span>
              <span className="timeWorkProduct">
                Miễn phí từ (8:30 - 17:30) mỗi ngày
              </span>
            </div>
          </div>
        </div>
        
      </div>
      
      <FindShop />
      <Footer />
    </div>
)};
const mapStateToProps = (state) =>{
  return {
    product: [
      ...state.Accessory,
      
    ],
    sale: state.Event
  }
}
export default connect(mapStateToProps)(DetailAcc);
