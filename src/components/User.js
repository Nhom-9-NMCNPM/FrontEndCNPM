import NavUser from "./User/NavUser"
import DetailUser from "./User/DetailUser"
import NavHeader from "./HomePage/NavHeader"
import FindShop from "./HomePage/FindShop"
import Footer from "./HomePage/Footer"
const User = () => {
    window.scrollTo(0,0)
    return (
        <div>
            <NavHeader />
            <NavUser />
            <DetailUser />
            <FindShop />
            <Footer />
        </div>
    )
}

export default User