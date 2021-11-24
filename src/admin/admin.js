import Shirt from "./components/Shirt"
import Dress from "./components/Dress"
import Trousers from "./components/Trousers"
import Skirt from "./components/Skirt"
import NavHeader from '../components/HomePage/NavHeader'
import '../style/Admin/admin.css'
const admin = () => {
    return (
        <div>
            <NavHeader />
            <Shirt />
            <Dress />
            <Trousers />
            <Skirt />
        </div>
    )
}

export default admin