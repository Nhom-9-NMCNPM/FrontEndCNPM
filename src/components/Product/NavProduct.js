import { Link } from 'react-router-dom'
import '../../style/Product/NavProduct.css'
const NavProduct = () => {
    return (
        <div>
            <ul className="itemscope">
                <li>
                    <a href="/">Trang chủ</a>
                </li>
                <li>
                    <a href="/">Danh mục sản phẩm</a>
                </li>
                <li>
                    <Link to="/"><b>Sản phẩm</b></Link>
                </li>
            </ul>

            <div className="wrap-collection-title row">
                <div className="col-6">
                    <span className="Mot">Sản phẩm</span>
                    <ul className="menuCollection">
                        <li>
                            <a href="/">Đầm</a>
                        </li>
                        <li>
                            <a href="/">Áo</a>
                        </li>
                        <li>
                            <a href="/">Chân váy</a>
                        </li>
                        <li>
                            <a href="/">Quần</a>
                        </li>
                        <li>
                            <a href="/">Phụ kiện</a>
                        </li>
                    </ul>
                </div>
                <div className="col-6">
                    <div className="filter-custom">
                        <div className="boloc">
                            <span className="">Bộ lọc:</span>
                        </div>
                        <ul className="group-filter">
                            <li>
                                <div>
                                    <b>Size</b>
                                    <span><i className="fa fa-sort-down"></i></span>
                                </div>
                                <ul className="check-box-list">
                                    <li>
                                        <input type="checkbox" name="" id="data-size-p1"/>
                                        <label for="data-size-p1">
                                            <span>S</span>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="" id="data-size-p2"/>
                                        <label for="data-size-p2">
                                            <span>M</span>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="" id="data-size-p3"/>
                                        <label for="data-size-p3">
                                            <span>L</span>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="" id="data-size-p4"/>
                                        <label for="data-size-p4">
                                            <span>XS</span>
                                        </label>
                                    </li>                                                                         
                                </ul>
                            </li>
                            <li>
                                <div>
                                    <b>Giá sản phẩm</b>
                                    <span><i className="fa fa-sort-down"></i></span>
                                </div>
                                <ul className="check-box-list">
                                    <li>
                                        <input type="checkbox" name="" id="data-size-p5"/>
                                        <label for="data-size-p5">
                                            <span>Dưới 500,000đ</span>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="" id="data-size-p6"/>
                                        <label for="data-size-p6">
                                            <span>500,000đ - 1,000,000đ</span>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="" id="data-size-p7"/>
                                        <label for="data-size-p7">
                                            <span>1,500,000đ - 2,000,000đ</span>
                                        </label>
                                    </li>
                                    <li>
                                        <input type="checkbox" name="" id="data-size-p8"/>
                                        <label for="data-size-p8">
                                            <span>Trên 2,000,000đ</span>
                                        </label>
                                    </li>                                                                         
                                </ul>
                            </li>
                            <li>
                                <div>
                                    <b>Màu sắc</b>
                                    <span><i className="fa fa-sort-down"></i></span>
                                </div>
                                <ul className="check-box-list color-list">
                                    <li>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#ef5777", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#ffd32a", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#d2dae2", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#3c40c6", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#0be881", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#f53b57", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#0fbcf9", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#000", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#fff", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                        <div style={{width: "25px", height: "25px", backgroundColor: "#ff3f34", display: "inline-block", margin: "5px", border: "1px solid", color:"#d2dae2" }}></div>
                                    </li>                                                                         
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NavProduct
