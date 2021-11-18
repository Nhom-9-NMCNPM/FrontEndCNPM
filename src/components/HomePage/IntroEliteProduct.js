import "../../style/HomePage/IntroEliteProduct.css"
import "../../style/HomePage/responsive.css"

const IntroEliteProduct = () => {
    return (
        <div>
            <div className="intro-elite-product">
            <div className="intro-elite-product-img">
                <a href="/" title="THE SYMPHONY OF ELITE">
                    <img src="https://theme.hstatic.net/200000000133/1000569834/14/home_aboutus.jpg?v=5160"
                        className="new-product-img" alt=""/>
                </a>
            </div>
            <div className="intro-elite-product-about">
                <div className="intro-elite-product-title">
                    <a href="/">
                        <h2>THE SYMPHONY OF ELITE VOL 2</h2>
                    </a>
                </div>
                <div className="intro-elite-product-content">
                    <p>THE SYMPHONY OF ELITE VOL 2 Tiếp nối bản hòa tấu của sự tinh tế giữa tháng 10, Vol.2 sẽ là mảnh
                        ghép hoàn chỉnh của BST The Symphony of Elite tái hiện qua những gam màu nâu cháy đỏ. Nếu như
                        Vol.1 là sự điểm xuyết của hoạ tiết Paisley nhằm tôn lên tính thanh lịch, tinh tế thì Vol.2 hoạ
                        tiết Paisley được mở rộng, tràn ngập trên bề mặt vải, kết hợp màu sắc nổi bật và form dáng thời
                        thượng. Tất cả tạo nên một tổng hoà sang trọng và cuốn hút. BST Vol.2 hứa hẹn sẽ đem đến cho
                        nàng một “bản phối” tinh tế, là điểm nhấn không thể thiếu trong tủ đồ của nàng dịp lễ hội cuối
                        năm.</p>
                </div>
                <div className="intro-elite-product-learn-more">
                    <a href="/">
                        <p className="intro-elite-product-learn-more-content">Tìm hiểu thêm</p>
                    </a>
                </div>
            </div>
            </div>
        </div>
    )
}

export default IntroEliteProduct