import NavProduct from "../components/Product/NavProduct"
import Product2Left from "../components/Product/Product2Left"
import Product2Right from "../components/Product/Product2Right"
import Product4 from "../components/Product/Product4"
import NavHeader from "../components/HomePage/NavHeader"
import Footer from "./HomePage/Footer"
import FindShop from "./HomePage/FindShop"
import { connect } from "react-redux"
const Product=({dress,trousers}) => {
    return (
       <div>
           <NavHeader />
            <div className="main-body">
                <NavProduct></NavProduct>

                <div class="collection-body container">
                    <Product2Left />
                    <Product4  data={dress}/>
                    <Product2Right />
                    <Product4 data={trousers} />
                </div>
            </div>
            <FindShop />
            <Footer />
       </div>
    )
}
const mapStateToProps = (state)  => {
    return {
        dress: state.Dress,
        trousers: state.Trousers,

    }
}
export default connect(mapStateToProps)(Product)