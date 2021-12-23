import Shirt from "./components/Shirt"
import Dress from "./components/Dress"
import Trousers from "./components/Trousers"
import Skirt from "./components/Skirt"
import NavHeader from '../components/HomePage/NavHeader'
import '../style/Admin/admin.css'
import ManagerUser from "./components/ManagerUser"
const admin = () => {
    return (
        <div>
            <NavHeader />
            <Shirt />
            <Dress />
            <Trousers />
            <Skirt />
            <ManagerUser />
        </div>
    )
}

export default admin