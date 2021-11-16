import NavProduct from "./NavProduct"
import Product2Left from "./Product2Left"
import Product2Right from "./Product2Right"
import Product4 from "./Product4"
const Product=() => {
    return (
        <div className="main-body">
            <NavProduct></NavProduct>

            <div class="collection-body container">
                <Product2Left></Product2Left>
                <Product4></Product4>
                <Product2Right></Product2Right>
                <Product4></Product4>
            </div>
        </div>
    )
}

export default Product