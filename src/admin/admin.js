import Shirt from "./components/Shirt"
import Dress from "./components/Dress"
import Trousers from "./components/Trousers"
import Skirt from "./components/Skirt"
import NavHeader from '../components/HomePage/NavHeader'
import '../style/Admin/admin.css'
import ManagerUser from "./components/ManagerUser"
import Voucher from "./components/Voucher"
const admin = () => {
    return (
        <div>
            <NavHeader />
            <Shirt />
            <Dress />
            <Trousers />
            <Skirt />
            <ManagerUser />
            <Voucher />
        </div>
    )
}

export default admin