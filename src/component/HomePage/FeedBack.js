import "../../style/HomePage/FeedBack.css"
import "../../style/HomePage/responsive.css"
import { useEffect } from "react"
import $ from 'jquery'
import 'slick-slider'

const FeedBack = () => {
    useEffect(() => {
        $('.feedback-slider').slick({
            dots: true,
            infinite: true,
            speed: 300,
            fade: true,
            cssEase: 'linear'
          });          
    },[])
    return (
        <div>
             <div className="feedback">
                <div className="feedback-content">
                    <div className="feedback-title">
                        <h2 className="heading-title">SAO VIỆT NÓI GÌ VỀ EVA DE EVA</h2>
                    </div>
                    <div className="feedback-slider">
                        <div className="feedback-item">
                            <div className="feedback-comment">
                                <p>"Các thiết kế của EDE luôn luôn thay đổi và mang đến những bất ngờ!"</p>
                            </div>
                            <div className="feedback-actor">
                                <div className="feedback-actor-img">
                                    <img
                                        src="https://theme.hstatic.net/200000000133/1000569834/14/avt_homeCustomer_1.jpg?v=5160" alt="anh" />
                                </div>
                                <div className="feedback-actor-info">
                                    <div className="feedback-actor-info-name">
                                        <p>Hoa Hậu Hương Giang</p>
                                    </div>
                                    <div className="feedback-actor-info-job">
                                        <p>Ca sĩ/ Người mẫu</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feedback-item">
                            <div className="feedback-comment">
                                <p>
                                    "Châu nghĩ một cô gái 21 tuổi với phong cách cá tính như mình có thể tự tin diện những
                                    trang phục của EDE thì ai cũng có thể!"
                                </p>
                            </div>
                            <div className="feedback-actor">
                                <div className="feedback-actor-img">
                                    <img
                                        src="https://theme.hstatic.net/200000000133/1000569834/14/avt_homeCustomer_3.jpg?v=5160" alt="anh" />
                                </div>
                                <div className="feedback-actor-info">
                                    <div className="feedback-actor-info-name">
                                        <p>Châu Bùi</p>
                                    </div>
                                    <div className="feedback-actor-info-job">
                                        <p>Hotgirl/ Người mẫu ảnh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feedback-item">
                            <div className="feedback-comment">
                                <p>
                                    “Vô cùng ngạc nhiên vì những bước chuyển mình trong thiết kế của EDE,
                                    ngày càng trẻ trung, bắt mắt! Lý Nhã Kỳ cảm thấy rất tự tin khi khoác lên mình trang
                                    phục EDE!"
                                </p>
                            </div>
                            <div className="feedback-actor">
                                <div className="feedback-actor-img">
                                    <img
                                        src="https://theme.hstatic.net/200000000133/1000569834/14/avt_homeCustomer_2.jpg?v=5160" alt="anh" />
                                </div>
                                <div className="feedback-actor-info">
                                    <div className="feedback-actor-info-name">
                                        <p>Lý Nhã Kỳ</p>
                                    </div>
                                    <div className="feedback-actor-info-job">
                                        <p>Người mẫu/ Diễn viên</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="feedback-item">
                            <div className="feedback-comment">
                                <p>
                                    "EDE đã có bước chuyển mình rất lớn để mang lại những thiết kế thời trang hơn, trẻ trung
                                    hơn mà không kém phần nữ tính, mang đến nhiều lựa chọn hơn cho phụ nữ Việt!"
                                </p>
                            </div>
                            <div className="feedback-actor">
                                <div className="feedback-actor-img">
                                    <img
                                        src="https://theme.hstatic.net/200000000133/1000569834/14/avt_homeCustomer_4.jpg?v=5160" alt="anh" />
                                </div>
                                <div className="feedback-actor-info">
                                    <div className="feedback-actor-info-name">
                                        <p>Nguyễn Thu Quỳnh</p>
                                    </div>
                                    <div className="feedback-actor-info-job">
                                        <p>Diễn viên</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedBack