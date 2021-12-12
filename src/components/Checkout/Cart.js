import { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "../../style/Checkout/cart.css";
import Footer from "../HomePage/Footer";
import NavHeader from "../HomePage/NavHeader";
import { addCart, changeQuantity, removeCart } from "../../actions/cart";
import format_curency from "../../utils/displayPrice";
import { Redirect } from "react-router";
import { history } from "../../router/AppRouter";
import { showSuccessToast } from "../../utils/displayToastMess";
// Nguoi dung co 2 hanh dong
// 1. Remove san pham
// 2. Thay doi so luong san pham

const Cart = ({ user, cart, dispatch }) => {
    // Tong tien
    let totalCost = cart.reduce(
        (total, item) => total + item.price * item.count,
        0
    );

    return (
        <div className="cart">
            <div id="cart-selection">
                <NavHeader />
                <div class="cart-content">
                    <table class="table table-cart table-bordered">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product, index) => (
                                <tr key={index}>
                                    <td class="remove-product">
                                        <i
                                            class="remove-btn fas fa-times"
                                            onClick={() =>
                                                document
                                                    .querySelector(
                                                        ".warning__delete"
                                                    )
                                                    .classList.remove("hidden")
                                            }
                                        ></i>
                                    </td>
                                    <td class="table-image">
                                        <a href="#">
                                            <img src={product.img[0]} alt="" />
                                        </a>
                                    </td>
                                    <td class="product">
                                        <a href="#" class="name">
                                            {product.name}
                                        </a>
                                        <p class="size">
                                            {product.color}/{product.size}
                                        </p>
                                    </td>
                                    <td class="price">
                                        {format_curency(product.price)}
                                    </td>
                                    <td>
                                        <div class="quantity-area">
                                            <div
                                                class="btn-minus-quantity"
                                                onClick={() => {
                                                    if (product.count === 1) {
                                                        document
                                                            .querySelector(
                                                                ".warning__delete"
                                                            )
                                                            .classList.remove(
                                                                "hidden"
                                                            );
                                                    } else {
                                                        dispatch(
                                                            changeQuantity(
                                                                product.id,
                                                                product.size,
                                                                product.count -
                                                                    1
                                                            )
                                                        );
                                                    }
                                                }}
                                            >
                                                -
                                            </div>
                                            <div class="quantity-content">
                                                {product.count}
                                            </div>
                                            <div
                                                class="btn-add-quantity"
                                                onClick={() =>
                                                    dispatch(
                                                        changeQuantity(
                                                            product.id,
                                                            product.size,
                                                            product.count + 1
                                                        )
                                                    )
                                                }
                                            >
                                                +
                                            </div>
                                        </div>
                                    </td>
                                    <td class="total">
                                        {format_curency(
                                            product.price * product.count
                                        )}
                                    </td>

                                    {/* Xac nhan xoa san pham */}
                                    <div
                                        className="warning__popup warning__delete hidden"
                                        onClick={(e) => {
                                            if (e.target === e.currentTarget) {
                                                e.target.classList.add(
                                                    "hidden"
                                                );
                                            }
                                        }}
                                    >
                                        <div className="warning__inner">
                                            <div className="warning__header">
                                                <p>Comfirm</p>
                                            </div>
                                            <div className="warning__body">
                                                <p>
                                                    Bạn có chắc muốn xóa sản
                                                    phẩm này
                                                </p>
                                            </div>
                                            <div className="warning__footer">
                                                <button
                                                    className="btn-ok"
                                                    onClick={() => {
                                                        dispatch(
                                                            removeCart(
                                                                product.id,
                                                                product.size
                                                            )
                                                        );
                                                        document
                                                            .querySelector(
                                                                ".warning__delete"
                                                            )
                                                            .classList.add(
                                                                "hidden"
                                                            );
                                                    }}
                                                >
                                                    Ok
                                                </button>
                                                <button
                                                    className="btn-cancel"
                                                    onClick={() =>
                                                        document
                                                            .querySelector(
                                                                ".warning__delete"
                                                            )
                                                            .classList.add(
                                                                "hidden"
                                                            )
                                                    }
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div class="checkout-note">
                        <div class="title">Ghi chú:</div>
                        <textarea
                            name="note"
                            id="note"
                            cols="50"
                            rows="8"
                        ></textarea>
                        <ul class="promotion">
                            <li>
                                <img
                                    src="https://file.hstatic.net/200000000133/file/checked_policy_88963cf2ccb048e89303d8799c47c3e0.png"
                                    alt="Vận chuyển"
                                />
                                Miễn phí giao hàng cho hóa đơn từ 699.000đ
                            </li>
                            <li>
                                <img
                                    src="https://file.hstatic.net/200000000133/file/checked_policy_88963cf2ccb048e89303d8799c47c3e0.png"
                                    alt="Vận chuyển"
                                />
                                Phí giao hàng 20.000đ cho hóa đơn dưới 699.000đ
                            </li>
                        </ul>
                    </div>
                    <div class="order-info">
                        <p class="total_price">
                            Tổng cộng:
                            <span
                                style={{
                                    marginLeft: "10px",
                                    fontSize: "1.2em",
                                }}
                            >
                                {format_curency(totalCost)}
                            </span>
                        </p>

                        <button
                            id="checkout"
                            onClick={(e) => {
                                // Show warning login neu chua dang nhap
                                if (!user.email) {
                                    document
                                        .querySelector(".warning__login")
                                        .classList.remove("hidden");
                                    document.body.style.overflow = "hidden";
                                } else {
                                    if(cart.length === 0) {
                                        showSuccessToast("Vui lòng chọn sản phẩm trước khi thanh toán", "Cảnh báo!", 'error')
                                    }else{
                                        history.push("/checkout");
                                    }
                                    
                                }
                            }}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
                <Footer />
            </div>

            <div
                className="warning__popup warning__login hidden"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        e.target.classList.add("hidden");
                        document.body.style.overflow = "auto";
                    }
                }}
            >
                <div className="warning__inner">
                    <div className="warning__header">
                        <i class="warn-icon far fa-times-circle"></i>
                    </div>
                    <div className="warning__body">
                        <p>Vui lòng đăng nhập trước khi thanh toán</p>
                    </div>
                    <div className="warning__footer">
                        <button
                            onClick={() => {
                                document.body.style.overflow = "auto";
                                history.push("/account");
                            }}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Khi ham nay duoc goi tu trong ham connect, se nhan duoc doi so la state tu Redux
// Ham tra ve doi tuong ma component can su dung
const mapStateToProps = (state) => {
    return {
        user: state.User,
        cart: state.Cart,
    };
};

// Khi dc goi ham nhan duoc dispatch tu Redux cung cap
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
    };
};

// Dam bao Cart component khi hoat dong co the nhan dc du lieu tu Redux
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
