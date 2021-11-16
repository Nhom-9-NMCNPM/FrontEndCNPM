import Shirt from "./components/Shirt"
import Dress from "./components/Dress"
import Trousers from "./components/Trousers"
import Skirt from "./components/Skirt"
import '../style/Admin/admin.css'
const admin = () => {
    return (
        <div>
         <Shirt />
         <Dress />
         <Trousers />
         <Skirt />
        </div>
    )
}

export default admin