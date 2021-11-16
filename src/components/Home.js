import BackgroundFashion from "./HomePage/BackgroundFashion"
import FeedBack from "./HomePage/FeedBack"
import FindShop from "./HomePage/FindShop"
import Footer from "./HomePage/Footer"
import IntroEliteProduct from "./HomePage/IntroEliteProduct"
import MainEliteProduct from "./HomePage/MainEliteProduct"
import MainNewProduct from "./HomePage/MainNewProduct"
import MainProduct from "./HomePage/MainProduct"
import NavHeader from "./HomePage/NavHeader"
import News from "./HomePage/News"
import Slider from "./HomePage/Slider"

const Home = () => { 
    return (
        <div>
            <NavHeader />
            <Slider />
            <MainProduct/>
            <MainNewProduct />
            <IntroEliteProduct />
            <MainEliteProduct />
            <BackgroundFashion />
            <News />
            <FeedBack/>
            <FindShop/>
            <Footer/>
        </div>
    )
}

export default Home