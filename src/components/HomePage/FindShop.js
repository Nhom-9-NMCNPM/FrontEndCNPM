import "../../style/HomePage/responsive.css"
import "../../style/HomePage/FindShop.css"

const FindShop = () => {
    return (
        <div>
             <div className="findShop">
                 Tìm
                 <a href="/"> cửa hàng </a>
                 gần bạn nhất
                <i className="fa fa-map-marker findShop-icon" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default FindShop