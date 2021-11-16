import '../../style/HomePage/Slider.css'
import '../../style/HomePage/responsive.css'
import {useEffect} from 'react'

const Slider = () => {
    useEffect(() => {
        const slides = document.querySelectorAll('.slide');
        // Javascript for image slider autoplay navigation
        const repeat = ()=>{
        let active = document.getElementsByClassName('active');
        let i = 1;

        let repeater = () => {
        setTimeout(() => {
        // xóa hết các btn đang được active
            [...active].forEach((activeSlide) => { 
            activeSlide.classList.remove('active');
            });


        // Thêm active vào btn và slide
        slides[i].classList.add('active'); 
        i++;

        if(slides.length === i){
            i = 0;
        }
        if(i >= slides.length){
            return;
        }
        repeater();
        }, 2500);
        }
        repeater();
    }
    repeat();
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