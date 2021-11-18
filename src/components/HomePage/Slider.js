import '../../style/HomePage/Slider.css'
import '../../style/HomePage/responsive.css'
import 'slick-slider'
import $ from 'jquery'
import {useEffect} from 'react'

const Slider = () => {
    useEffect(() => {
        $('.img-slider').slick({
            slidesToShow: 1, 
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
            cssEase: 'linear',
            arrows: false,
        });
    }, []) 
    return (
        <div>
            <div className="img-slider">
                <a href="/">
                    <div className="slide active">
                        <img src="https://theme.hstatic.net/200000000133/1000569834/14/slideshow_4.jpg?v=5142" alt="" />
                    </div>
                </a>
                <a href="/">
                    <div className="slide">
                        <img src="https://theme.hstatic.net/200000000133/1000569834/14/slideshow_2.jpg?v=5142" alt="" />
                    </div>
                </a>
                <a href="/">
                    <div className="slide">
                        <img src="https://theme.hstatic.net/200000000133/1000569834/14/slideshow_1.jpg?v=5142" alt="" />
                    </div>
                </a>
            </div>
        </div>
    )
}



export default Slider