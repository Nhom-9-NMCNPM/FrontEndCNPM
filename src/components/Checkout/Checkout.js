import { connect, useSelector } from "react-redux";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { history } from "../../router/AppRouter";
import "../../style/Checkout/checkout.css";

import LoadingPage from "../LoadingPage";
import format_curency from "../../utils/displayPrice";
import Validator from "./validate/Validator";
import voucher from "./icon/gift-voucher.png";
import { resetCart } from "../../actions/cart";
import { showSuccessToast } from "../../utils/displayToastMess";
import { order } from "../../actions/user";
// Gui len server $data nhan ve id
const ORDER = gql`
    mutation Mutation($data: createOrderInput!) {
        createOrder(data: $data) {
            id
            createdAt
            updatedAt
            namePro
            price
            status
        }
    }
`;

const UPDATE_USER = gql`
    mutation Mutation($data: updateUserInput!, $email: String!) {
        updateUser(data: $data, email: $email) {
            id
        }
    }
`;

// const Checkout = ({ user, cart }) => {
const Checkout = ({resetCart, orderRedux}) => {
    const [show, setShow] = useState(false);
    const [coupon, setCoupon] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const { user, cart } = useSelector((state) => ({
        user: state.User,
        cart: state.Cart,
    }));
    // Tỏng giá trị đơn hàng (Không bao gồm mã giảm giá và phí vận chuyển)
    const total = cart.reduce(
        (total, item) => total + item.price * item.count,
        0
    );
    const [couponRate, setCouponRate] = useState(0);
    const [order, { loading, error }] = useMutation(ORDER, {
        onCompleted: (data)=>{
            orderRedux(data.createOrder);
            resetCart();
            setIsLoading(false);
            showSuccessToast("Đăt hàng thành công");
            history.push('/')
        }
    });
    const [update] = useMutation(UPDATE_USER);
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
    });

    const handlePayment = () => {
        const namePro = cart.map((item, index) => {
            return `${item.name} ${item.color} size: ${item.size} Số lượng: ${item.count} Mã sản phẩm: ${item.codePro}`;
        });

        const price = cart.reduce(
            (total, item) => total + item.price * item.count,
            0
        );

        order({
            variables: {
                data: {
                    price: parseInt(price, 10),
                    namePro,
                    status: "Chờ xử lý",
                    userId: user.id,
                },
            },
        });
        // updateUser
        update({
            variables: {
                data: {
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                },
                email: data.email,
            },
        });
    };

    useEffect(() => {
        const inputs = Array.from(document.querySelectorAll("input[name]"));

        inputs.forEach((input) => {
            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            });
        });

        Validator({
            form: "#checkout-form",
            formGroupSelector: ".form-group",
            errorSelector: ".form-message",
            rules: [
                Validator.isRequired("#fullname"),
                Validator.isRequired("#phone"),
                Validator.isRequired("#address"),
                Validator.isEmail("#mail"),
            ],
            onSubmit:async function () {
                setIsLoading(true);
                await handlePayment();
            },
        });
    });
    if (loading) return <LoadingPage />;

    const vouchers = [
        {
            rate: 20,
            condition: 1000000,
        },
        {
            rate: 25,
            condition: 0,
        },
        {
            rate: 10,
            condition: 200000,
        },
        {
            rate: 15,
            condition: 3000000,
        },
        {
            rate: 25,
            condition: 0,
        },
    ];
    if(isLoading) return <LoadingPage />;
    return (
        <div>
            {console.log("Re-render")}
            <div className="checkout-content row">
                <div className="main col-7">
                    <div className="main-header">
                        <a href="/" className="logo"></a>
                        <ul
                            className="breadcrumb"
                            style={{ padding: ".35rem 1rem" }}
                        >
                            <li className="breadcrumb-item">
                                <Link to="/cart">Giỏ hàng</Link>
                            </li>
                            <li className="breadcrumb-item breadcrumb-item-current">
                                Thông tin giao hàng
                            </li>
                        </ul>
                    </div>
                    <div className="main-content">
                        <form className="form" id="checkout-form">
                            <h3 className="heading">Thông tin giao hàng</h3>
                            <div className="form-group">
                                <label for="fullname" className="form-label">
                                    Họ và tên
                                </label>
                                <input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    placeholder="VD: Ngô Tuấn Anh"
                                    className="form-control"
                                />
                                <span className="form-message"></span>
                            </div>
                            <div className="form-group">
                                <label for="mail" className="form-label">
                                    Email
                                </label>
                                <input
                                    readOnly={true}
                                    value={data.email}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            email: e.target.value,
                                        })
                                    }
                                    id="mail"
                                    name="mail"
                                    type="text"
                                    placeholder="VD: ngotuananh@gmail.com"
                                    className="form-control"
                                />
                                <span className="form-message"></span>
                            </div>

                            <div className="form-group">
                                <label for="phone" className="form-label">
                                    Số điện thoại
                                </label>
                                <input
                                    value={data.phoneNumber}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            phoneNumber: e.target.value,
                                        })
                                    }
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    placeholder="VD: 12345678"
                                    className="form-control"
                                />
                                <span className="form-message"></span>
                            </div>

                            <div className="form-group">
                                <label for="address" className="form-label">
                                    Địa chỉ
                                </label>
                                <input
                                    value={data.address}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            address: e.target.value,
                                        })
                                    }
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="VD: Số 70, Khoang Sau, xã Sơn Đông"
                                    className="form-control"
                                />
                                <span className="form-message"></span>
                            </div>
                            <div className="method">
                                <div className="method-content">
                                    <h3 className="method-title">
                                        Phương thức vận chuyển
                                    </h3>
                                    <p className="method-text">
                                        Miễn phí giao hàng
                                        <span className="ship-price">0đ</span>
                                    </p>
                                </div>

                                <div className="method-content">
                                    <h3 className="method-title">
                                        Phương thức thanh toán
                                    </h3>
                                    <p className="method-text">
                                        Thanh toán khi giao hàng (COD)
                                        <span></span>
                                    </p>
                                </div>

                                <div className="payment">
                                    <button
                                        className="btn-payment"
                                        type="submit"
                                    >
                                        Hoàn tất đơn hàng
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="sidebar col-5">
                    <div className="products">
                        <table class="product-table">
                            <tbody>
                                {cart.map((item, index) => (
                                    <tr className="order-item" key={index}>
                                        <td style={{ width: "4rem" }}>
                                            <div class="product-thumbnail">
                                                <img
                                                    class="product-thumbnail-image"
                                                    alt={`${item.name}, ${item.codePro}`}
                                                    src={item.img[0]}
                                                />
                                                <span class="product-thumbnail-quantity">
                                                    {item.count}
                                                </span>
                                            </div>
                                        </td>
                                        <td class="product-description">
                                            <p class="product-name">
                                                {`${item.name}, ${item.codePro}`}
                                            </p>
                                            <p class="product-style">
                                                {item.color} / {item.size}
                                            </p>
                                        </td>
                                        <td>
                                            <span class="product-price">
                                                {format_curency(
                                                    item.price * item.count
                                                )} đ
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="discount">
                        <img src={voucher} className="discount-icon" />
                        <p className="discount-title">EvaDeEva Voucher</p>
                        <button
                            className="discount-btn"
                            onClick={() => {
                                setShow(true);
                                document.body.style.overflow = "hidden";
                            }}
                        >
                            Chọn mã giảm giá
                        </button>
                    </div>

                    {show && (
                        <div className="discount-popup">
                            <div className="discount-popup__overlay"></div>
                            <div className="discount-popup-containter">
                                <div className="discount-popup-header">
                                    Chọn Eva DeEva Voucher
                                </div>
                                <div className="discount-popup-main">
                                    <div class="title">
                                        Giảm Giá &amp; Khuyến mại
                                        <span>Có thể chọn 1</span>
                                    </div>

                                    <div className="discount-list-items">
                                        {vouchers.map((voucher, index) => (
                                            <div
                                                className="discount-item"
                                                key={index}
                                            >
                                                <div
                                                    className="discount-item__main"
                                                    style={
                                                        index === coupon
                                                            ? total <
                                                              voucher.condition
                                                                ? {
                                                                      background:
                                                                          "#a3423c",
                                                                      color: "white",
                                                                  }
                                                                : {
                                                                      background:
                                                                          "#B4FE98",
                                                                      color: "black",
                                                                      fontWeight: 500,
                                                                  }
                                                            : {}
                                                    }
                                                >
                                                    <div className="discount-item__thumbnail">
                                                        <div className="discount-item-thumbnail"></div>
                                                        <div className="discount-item-thumbnail-text">
                                                            Tất cả sản phẩm
                                                        </div>
                                                    </div>
                                                    <div className="discoun-item__content">
                                                        <div className="discount-item__text">
                                                            <div className="discount-item__name">
                                                                Giảm{" "}
                                                                {voucher.rate}%
                                                                giá trị đơn hàng
                                                            </div>
                                                            <div className="discount-item__condition">
                                                                Đơn Tối Thiểu ₫
                                                                {format_curency(
                                                                    voucher.condition
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="discount-item-select">
                                                            <input
                                                                name="discount"
                                                                type="radio"
                                                                checked={
                                                                    index ===
                                                                    coupon
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    setCoupon(
                                                                        index
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {coupon === index &&
                                                    total <
                                                        voucher.condition && (
                                                        <div className="discount-item__message">
                                                            Không đủ điều kiện
                                                            áp dụng mã giảm giá
                                                            này!
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="discount-popup-footer">
                                    <button
                                        className="discount-popup-btn cancel-btn"
                                        onClick={() => {
                                            if (
                                                coupon > 0 &&
                                                total <
                                                    vouchers[coupon].condition
                                            ) {
                                                setCouponRate(0);
                                            }
                                            setCoupon(-1);
                                            setShow(false);
                                            document.body.style.overflow =
                                                "auto";

                                            // Logic
                                        }}
                                    >
                                        Trở lại
                                    </button>
                                    <button
                                        className="discount-popup-btn accept-btn"
                                        onClick={(e) => {
                                            // Logic
                                            const index = coupon; // chỉ số trong mảng voucher

                                            if (index < 0) {
                                                alert(
                                                    "Bạn chưa chọn mã giảm giá"
                                                );
                                                return;
                                            }

                                            if (
                                                total <
                                                vouchers[index].condition
                                            ) {
                                                alert(
                                                    "Mã giảm giá không hợp lệ.\nVui lòng chọn một mã khác!"
                                                );
                                                return;
                                            }

                                            setCouponRate(vouchers[index].rate);
                                            setShow(false);
                                            document.body.style.overflow =
                                                "auto";
                                        }}
                                    >
                                        Ok
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="payment-desc">
                        <div className="payment-detail">
                            <p className="payment-text">Tạm tính</p>
                            <p className="payment-price">
                                {format_curency(total)}đ
                            </p>
                        </div>

                        <div className="payment-detail">
                            <p className="payment-text">Khuyến mãi</p>
                            <p className="payment-price">
                                {format_curency(parseInt((total * couponRate) / 100),10)}đ
                            </p>
                        </div>

                        <div className="payment-detail">
                            <p className="payment-text">Phí vận chuyển</p>
                            <p className="payment-price">Miễn phí</p>
                        </div>

                        <p className="freeship-content">
                            Bạn được miễn phí giao hàng cho hóa đơn trên
                            699.000đ
                        </p>
                    </div>

                    <div className="total-price-final">
                        <p className="total-price-title">Tổng cộng</p>
                        <p className="total-price-content">
                            {format_curency(parseInt(total - (total * couponRate) / 100,10))}đ
                        </p>
                    </div>

                    <div className="thankful-note">
                        <p>
                            EVA DE EVA ghi nhận đơn hàng và sẽ KIỂM TRA lại tình
                            trạng sản phẩm trước khi confirm qua EMAIL. Do tình
                            hình dịch bệnh nên thời gian chuyển phát chậm hơn so
                            với bình thường, bạn vui lòng kiểm tra EMAIL và
                            thông cảm cho sự chậm trễ của chúng tôi nhé!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapDispatchToProps = (dispatch) =>{
    return {
        resetCart:()=>dispatch(resetCart()),
        orderRedux:(data) => dispatch(order(data))
    }
}
export default connect(null,mapDispatchToProps)(Checkout);
