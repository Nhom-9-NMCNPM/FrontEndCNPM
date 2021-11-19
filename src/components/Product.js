import NavProduct from "../components/Product/NavProduct"
import Product2Left from "../components/Product/Product2Left"
import Product2Right from "../components/Product/Product2Right"
import Product4 from "../components/Product/Product4"
import NavHeader from "../components/HomePage/NavHeader"
import Footer from "./HomePage/Footer"
import FindShop from "./HomePage/FindShop"
const Product=() => {
    return (
       <div>
           <NavHeader />
            <div className="main-body">
                <NavProduct></NavProduct>

                <div class="collection-body container">
                    <Product2Left />
                    <Product4 value={false} />
                    <Product2Right />
                    <Product4 value={true} />
                </div>
            </div>
            <FindShop />
            <Footer />
       </div>
    )
}

export default Product