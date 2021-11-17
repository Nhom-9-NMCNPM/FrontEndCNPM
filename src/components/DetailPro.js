import "../style/detailPro.css"; // css
import FindShop from "./HomePage/FindShop";
import Footer from "./HomePage/Footer";
import MainEliteProduct from "./HomePage/MainEliteProduct";
import NavHeader from "./HomePage/NavHeader";
const DetailPro = () => (
    <div>
      <NavHeader />
      <div className="product-container">
        <div className="row product">
          <div className="product-images col-7">
            <div className="row">
              <div className="thumbs col-2">
                <div className="thumb-item active">
                  <img
                    src="https://product.hstatic.net/200000000133/product/dsc00446_ea464bf12cde4389b983ea5da442f70d_master.jpg"
                    alt=""
                  />
                </div>
                <div className="thumb-item">
                  <img
                    src="https://product.hstatic.net/200000000133/product/dsc00446_ea464bf12cde4389b983ea5da442f70d_master.jpg"
                    alt=""
                  />
                </div>
                <div className="thumb-item">
                  <img
                    src="https://product.hstatic.net/200000000133/product/dsc00446_ea464bf12cde4389b983ea5da442f70d_master.jpg"
                    alt=""
                  />
                </div>
                <div className="thumb-item">
                  <img
                    src="https://product.hstatic.net/200000000133/product/dsc00446_ea464bf12cde4389b983ea5da442f70d_master.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="main-images col-10">
                <img
                  src="https://product.hstatic.net/200000000133/product/dsc00446_ea464bf12cde4389b983ea5da442f70d_master.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="product-details col-5">
            <h1>Quần trong bộ Vest-Quần, 21AQQE025D</h1>

            <div className="skuProduct">
              <label>SKU:</label>
              <span>21AQDE064X</span>
            </div>
            <span className="product-price">1,199,000đ</span>
            <div className="desProduct">
              <span>Thông tin sản phẩm:</span>
              <p className="title">
                Quần dài, cạp cao, ống suông rộng, có khóa kéo và khuy cài phía
                trước.
              </p>
              <p>Màu sắc: Xanh</p>
              <p>Chất liệu: Vải Tuýt si</p>
              <p>
                <a href="/">Hướng dẫn bảo quản, giặt là</a>
              </p>
            </div>
            <div className="product-style">
              <p>Xanh</p>
              <a href="/">
                <img
                  src="https://product.hstatic.net/200000000133/product/21able012x_21aqde064x_99fe88d9009a447cabfbb61c64066a54_small.jpg"
                  alt=""
              />
              </a>
            </div>
            <div className="size-area">
              <p>Size</p>
              <div className="option">
                <input
                  type="radio"
                  name="size"
                  value="s"
                  checked
                  hidden
                  id="s-size"
                />
                <label for="s-size" className="size-radio-btn check">
                  S
                </label>
              </div>
              <div className="option">
                <input type="radio" name="size" value="m" hidden id="m-size" />
                <label for="m-size" className="size-radio-btn">
                  M
                </label>
              </div>
              <div className="option">
                <input type="radio" name="size" value="l" hidden id="l-size" />
                <label for="l-size" className="size-radio-btn">
                  L
                </label>
              </div>
            </div>

            <div className="quantity-area">
              <input
                type="button"
                value="-"
                data-type="minus"
                data-field="quantity"
                className="qty-btn"
              />
              <input type="text" className="qty-input" value="1" disabled />
              <input
                type="button"
                value="+"
                data-type="plus"
                data-field="quantity"
                className="qty-btn"
              />
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
);

export default DetailPro;
