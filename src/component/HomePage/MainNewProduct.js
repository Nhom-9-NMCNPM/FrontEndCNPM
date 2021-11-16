import "../../style/HomePage/MainNewProduct.css"
import "../../style/HomePage/responsive.css"
import { useEffect } from "react"
import $ from 'jquery'
import 'slick-slider'


const MainNewProduct = () => {
    useEffect(() => {
        $('.main-new-product-slide').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows:true,    
          });
    },[])
    return (
        <div>
             <div className="main-new-product container-xl">
                <div className="main-new-product-title">
                    <h2 className="product-title">
                        <a href="/" title="SẢN PHẨM MỚI NHẤT">
                            SẢN PHẨM MỚI NHẤT
                        </a>
                        <p className="product-view-more">
                            <a href="/" className="Xem tất cả">
                                Xem tất cả
                            </a>
                        </p>
                    </h2>
                </div>
                <div className="main-new-product-slide">
                    <div className="new-product-slide-item ">
                        <a href="/">
                            <div className="new-product-img">
                                <img src="https://product.hstatic.net/200000000133/product/thuha6313_7e0a350f2c7e4fffa369d57e51f0311f_grande.jpg"
                                    className="img-change" alt="anh"/>
                                <img src="https://product.hstatic.net/200000000133/product/thuha6331_13673721ad71435d8b2e1fa448a4ea42_grande.jpg"
                                    alt="anh" />
                                <div className="new-product-lable-tag">
                                    <img src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png"
                                        alt="anh" />
                                </div>
                            </div>
                        </a>
                        <div className="new-product-content">
                            <div className="new-product-content-title">
                                <a href="/">
                                    Quần dài, Ống đứng 21AQDE059D
                                </a>
                            </div>
                            <span className="new-product-content-title-price">999.000đ</span>
                        </div>
                    </div>
                    <div className="new-product-slide-item ">
                        <a href="/">
                            <div className="new-product-img">
                                <img src="https://product.hstatic.net/200000000133/product/thuha6271_a25934fb04574f77ac21f4b7afe0584d_grande.jpg"
                                    className="img-change" alt="anh" />
                                <img src="https://product.hstatic.net/200000000133/product/thuha6295_6c7bec06e4594bf6ad4e7339367734a5_grande.jpg"
                                    alt="anh" />
                                <div className="new-product-lable-tag">
                                    <img src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png"
                                        alt="anh" />
                                </div>
                            </div>
                        </a>
                        <div className="new-product-content">
                            <div className="new-product-content-title">
                                <a href="/">
                                    Blazer 21ABLE009N
                                </a>
                            </div>
                            <span className="new-product-content-title-price">1.899.000đ</span>
                        </div>
                    </div>
                    <div className="new-product-slide-item ">
                        <a href="/">
                            <div className="new-product-img">
                                <img src="https://product.hstatic.net/200000000133/product/21asme100f_21acve126f_9e3fb3202c2e409dbd766d686bcfe61a_grande.jpg"
                                    className="img-change" alt="anh"/>
                                <img src="https://product.hstatic.net/200000000133/product/thuha5963_167ab933ea8b4ce8baf434b33db3b0b2_grande.jpg"
                                    alt="anh" />
                                <div className="new-product-lable-tag">
                                    <img src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png"
                                        alt="anh" />
                                </div>
                            </div>
                        </a>
                        <div className="new-product-content">
                            <div className="new-product-content-title">
                                <a href="/">
                                    Sơ mi tay dài, dáng sơ vin 21AFME100F
                                </a>
                            </div>
                            <span className="new-product-content-title-price">999.000đ</span>
                        </div>
                    </div>
                    <div className="new-product-slide-item ">
                        <a href="/">
                            <div className="new-product-img">
                                <img src="https://product.hstatic.net/200000000133/product/21able030b_21acve073b_fae761ebe92c460c9c989512ab9a3dda_grande.jpg"
                                    className="img-change" alt="anh"/>
                                <img src="https://product.hstatic.net/200000000133/product/thuha6520_07be62511e1c4899b4f5e08462a43a7f_grande.jpg"
                                    alt="anh" />
                                <div className="new-product-lable-tag">
                                    <img src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png"
                                        alt="anh" />
                                </div>
                            </div>
                        </a>
                        <div className="new-product-content">
                            <div className="new-product-content-title">
                                <a href="/">

                                    Chân váy Midi, Xếp ly 21ACVE126F

                                </a>
                            </div>
                            <span className="new-product-content-title-price">999.000đ</span>
                        </div>
                    </div>
                    <div className="new-product-slide-item ">
                        <a href="/">
                            <div className="new-product-img">
                                <img src="https://product.hstatic.net/200000000133/product/thuha7103_d0d7b7bbc5ea4f148b3e0b9eeda864b8_grande.jpg"
                                    className="img-change" alt="" />
                                <img src="https://product.hstatic.net/200000000133/product/thuha7128_f2d27802c28540e1b3c5c08d02f2d3a3_grande.jpg"
                                    alt="anh" />
                                <div className="new-product-lable-tag">
                                    <img src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png"
                                        alt="anh" />
                                </div>
                            </div>
                        </a>
                        <div className="new-product-content">
                            <div className="new-product-content-title">
                                <a href="/">
                                    Đầm tay lỡ, dáng thắt eo 21ADKE121C
                                </a>
                            </div>
                            <span className="new-product-content-title-price">1.999.000đ</span>
                        </div>
                    </div>
                    <div className="new-product-slide-item ">
                        <a href="/">
                            <div className="new-product-img">
                                <img src="https://product.hstatic.net/200000000133/product/21aawe012t_0afdcd8627204962af78d06b7c6ffe46_grande.jpg"
                                    className="img-change" alt=""/>
                                <img src="https://product.hstatic.net/200000000133/product/thuha6421_40033a18bcec45ab929d254bc7d1d137_grande.jpg"
                                    alt="anh" />
                                <div className="new-product-lable-tag">
                                    <img src="https://file.hstatic.net/200000000133/file/1_113da73eef75425786591a547aeda483.png"
                                        alt="anh" />
                                </div>
                            </div>
                        </a>
                        <div className="new-product-content">
                            <div className="new-product-content-title">
                                <a href="/">
                                    Áo hai dây 21AAWE012T
                                </a>
                            </div>
                            <span className="new-product-content-title-price">499.000đ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainNewProduct