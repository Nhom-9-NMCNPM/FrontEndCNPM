
import '../../style/HomePage/MainProduct.css'
import '../../style/HomePage/responsive.css'
const MainProduct = () => {
    return (
        <div>
            <div className="main-product container-xl">
                <div className="row  ">
                    <div className="col-4 main-product-content main-product-down animateBanner">
                        <a href="/">
                            <img  alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/home3banner_1.jpg?v=5150"
                                className="main-product-img" />
                        </a>
                    </div>
                    <div className="col-4 main-product-content animateBanner">
                        <a href="/">
                            <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/home3banner_2.jpg?v=5150"
                                className="main-product-img" />
                        </a>
                    </div>
                    <div className="col-4 main-product-content main-product-down animateBanner">
                        <a href="/">
                            <img alt="anh" src="https://theme.hstatic.net/200000000133/1000569834/14/home3banner_3.jpg?v=5150"
                                className="main-product-img" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainProduct