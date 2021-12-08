import "../style/detailPro.css"; // css
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


const size = ['M','S','L', 'XL']
const DetailPro = ({product, match, dispatch}) => { 
  window.scrollTo(0,0)
  const [keyActive, setkeyActive] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const detailPro = product.filter((item) => item.codePro === match.params.code)[0];
  const [activeImg, setActiveImg ] = useState(0)


  function toast({ title = "", message = "", type = "success", duration = 1000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add(`toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                        <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                        <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
  }
  function showSuccessToast() {
    toast({
      title: "Thành công!",
      message: "Bạn đã thêm vào giỏ hàng",
      type: "success",
      duration: 1000
    })
    console.log(1);
  }
  const handleAddCart = ()=>{
    showSuccessToast()
    dispatch(addCart({
      id:detailPro.id,
      name: detailPro.name,
      img: detailPro.img,
      color: detailPro.color,
      codePro: detailPro.codePro,
      count: quantity,
      size: keyActive,
      price: detailPro.price,
    }))
    
  }
  return (
    <div>
      <NavHeader  />
      <div id="toast">
      </div>
      <div className="product-container">
        <NavProduct linkPro={detailPro.name}/>
        <div className="row product">
          <div className="product-images col-7">
            <div className="row">
              <div className="thumbs col-2">
                {detailPro.img.map((item,index) => {
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
                  src={detailPro.img[parseInt(activeImg, 10)]}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="product-details col-5">
            <h1>{detailPro.name}</h1>

            <div className="skuProduct">
              <label>SKU:</label>
              <span>{detailPro.codePro}</span>
            </div>
            <span className="product-price">{format_curency(detailPro.price)}đ</span>
            <div className="desProduct">
              <span>Thông tin sản phẩm:</span>
              <p className="des-title">
                {detailPro.description}
              </p>
              <p>Màu sắc: {detailPro.color}</p>
              <p>Chất liệu: {detailPro.material}</p>
            </div>
            <div className="size-area">

                  <p>Size</p>

                  <div className="option">

                    {size.map((item,index) => {

                        return (

                            <div className={`option-content ${( keyActive === item) && "active-size"}`} key={index} onClick={() => {

                                setkeyActive(item)

                              }}>

                                {item}

                            </div>

                        )

                    })}

                  </div>



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
      ...state.Shirt,
      ...state.Skirt,
      ...state.Dress,
      ...state.Trousers
    ]
  }
}
export default connect(mapStateToProps)(DetailPro);
