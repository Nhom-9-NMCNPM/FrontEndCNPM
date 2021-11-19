import "../style/detailPro.css"; // css
import FindShop from "./HomePage/FindShop";
import Footer from "./HomePage/Footer";
import MainEliteProduct from "./HomePage/MainEliteProduct";
import NavHeader from "./HomePage/NavHeader";
import {useState} from 'react';
import {connect} from 'react-redux';
import format_curency from "../utils/displayPrice";
const size = ['M','S','L', 'XL']
const DetailPro = ({product, match, history}) => {
  const [keyActive, setkeyActive] = useState('')
  const [quantity, setQuantity] = useState(1)
  const detailPro = product.filter((item) => item.codePro === match.params.code)[0];
  console.log(detailPro)
  return (
    <div>
      <NavHeader />
      <div className="product-container">
        <div className="row product">
          <div className="product-images col-7">
            <div className="row">
              <div className="thumbs col-2">
                <div className="thumb-item active">
                  <img
                    src={detailPro.img[0]}
                    alt=""
                  />
                </div>
                <div className="thumb-item">
                  <img
                    src={detailPro.img[1]}
                    alt=""
                  />
                </div>
              </div>
              <div className="main-images col-10">
                <img
                  src={detailPro.img[1]}
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
              <p className="title">
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
            <button type="button" className="btn btn-dark addCart">
              Mua ngay
            </button>

            <div className="hotlineProduct">
              <span className="titleHotlineProduct">
                Mua hàng Online
                <a href="/">1800 1732</a>
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
