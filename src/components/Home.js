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
import { connect } from "react-redux"
import { Redirect } from "react-router"

const Home = ({user}) => { 
    if( user.admin) {
        return (
            <Redirect to="/admin-shirt"></Redirect>
        )
    } else {
        if( user.staff ) {
            return (
                <Redirect to="/admin-offline-product"></Redirect>
            )
        }else{

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
    }
}
const mapStateToProps = (state) => {
    return {
        user : state.User,
    }
}
export default connect(mapStateToProps)(Home)