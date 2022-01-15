import { connect } from 'react-redux'
import { useEffect, useState} from 'react'
import NavHeader from '../components/HomePage/NavHeader'
import "../style/Admin/Bill.css"
import format_curency from '../utils/displayPrice'
import { showSuccessToast } from '../utils/displayToastMess'
import { gql, useMutation } from '@apollo/client'
import LoadingPage from '../components/LoadingPage'

const CREATE_ORDER = gql`
            mutation Mutation($data: createOrderInput!) {
                createOrder(data: $data) {
                id
                }
            }
`
const UPDATE_USER = gql`
    mutation Mutation($data: updateUserInput!, $userId: Int) {
        updateUser(data: $data, userId: $userId) {
            id
        }
    }
`
const ProductOffline = ({product,userList, voucher}) => {
    const [inputSearch, setInputSearch] = useState('')
    const resultProduct = product.find((item) => {
        return item.codePro.toLowerCase() === inputSearch.toLowerCase()
    })
    const [productBill, setProductBill] = useState([])
    let [reRender, setReRender] = useState(0)
    const [vcher, setVcher] = useState(voucher[0].disCount)
    const vcherBill = voucher.find((item) => {
        return item.disCount === parseInt(vcher)
    })
    const [userOff, setUserOff] = useState(userList[0].email)
    const isEqualResultProduct = (element) => {
        return element.codePro === resultProduct.codePro
    }
    let totalBill = Math.round(productBill.reduce((sum, currentItem) => { 
        return sum + currentItem.price * currentItem.quantity * (1-0.01*vcher)
    },0))
    let totalBillNotVoucher = Math.round(productBill.reduce((sum, currentItem) => { 
        return sum + currentItem.price * currentItem.quantity
    },0))
    const userBill = userList.find((user) => {
        return user.email === userOff
    })
    const [updateUser] = useMutation(UPDATE_USER)
    const [createOrder, {loading, error, data}] = useMutation(CREATE_ORDER, {
        onCompleted: (data) => {
                updateUser({
                    variables:{
                        userId: userBill.id,
                        data:{
                            point: parseInt(totalBill/100,10)
                        }
                    }
                })
        }
    })
    const timeBill = {day: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear()}
    useEffect(() => {
       
    },[totalBillNotVoucher, vcherBill.condition])
    const handleEnterInput = (event) => {
        if(event.key === 'Enter') {
            if(resultProduct) {
                if(!productBill.some(isEqualResultProduct)) {
                    setProductBill([...productBill,
                        {...resultProduct,
                            size: 'M',
                            quantity: 1
                        }
                        ])
                } else {
                    showSuccessToast("Bạn đã thêm sản phẩm này rồi!", "Thông báo","error")
                }
            } else {
                showSuccessToast("Sản phẩm không tồn tại!", "Thông báo","error")
            }
            
        }
    }
    const handleInputSearch = (e) => {
        setInputSearch(e)
    }
    const handleRemoveProductItem = (element) => {
        setProductBill(productBill.filter((item) => {
            return item !== element
        }))
    }
    const handleExportBill = async () => {
        if(totalBillNotVoucher < vcherBill.condition) {
            showSuccessToast("Đơn hàng chưa đủ điều kiện áp dụng khuyến mại!", "Thông báo", "error")
        } else {
            const namePro = productBill.map((item) => {
                return `${item.name} Giá: ${item.price} Số Lượng: ${item.quantity} Size: ${item.size} Mã: ${item.codePro}`
            })
            await createOrder({
                variables: {
                    data: {
                        namePro,
                        price: totalBill,
                        userId: userBill.id,
                        status: 'Đã giao hàng'
                    }
                }
            })
            showSuccessToast("Xuất hóa đơn thành công")
        }
    }
    if(loading) {
        return <LoadingPage />
    }
    console.log(vcherBill, vcher);
   
    return (
       <div>
            <NavHeader  offProduct={true}/>
            <div className='page-bill container-fluid'>
                <div className='bill row'>
                    <div className='bill-right col-6'>
                        <div className='bill-design'>
                           
                            <div className="bill-search">
                            <p className='title-bill'>Thông tin đơn hàng</p>
                                    <div className="bill-form">
                                            <input autoFocus={true} type="text" className='test'  placeholder="Nhập mã sản phẩm..." value={inputSearch} 
                                            onChange={(e) => {handleInputSearch(e.target.value)}}
                                            onKeyPress={(e) => handleEnterInput(e)}/>
                                            <div className='bill-icon-search'><i class="fas fa-search" /></div>
                                    </div>
                            </div>
                            <ul className='bill-list'>
                                {productBill.map((item,index) => {
                                    return (
                                        <li className='bill-item' key={index}>
                                            <div className='list-to-do'></div>
                                            <div className='bill-item-img'>
                                                <img src={item.img[0]} alt='anh' />
                                            </div>
                                            <div className='bill-item-content'>
                                                <div className='bill-content-name'>{item.name}</div>
                                                <div className='bill-content-detail'>
                                                    <div className='bill-content-left'>
                                                        <div className='bill-detail-price'>Giá:   {format_curency(item.price)}đ</div>
                                                        <div className='bill-detail-size'>Size:
                                                            <select className="form-select bill-select-size" value={item.size} onChange={(e) => {
                                                                item.size = e.target.value
                                                                setReRender(reRender + 1)
                                                                }} aria-label="Default select example">
                                                                <option value="S">S</option>
                                                                <option value="L">L</option>
                                                                <option value="M">M</option>
                                                                <option value="XL">XL</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='bill-content-right'>
                                                        <div className='bill-item-event'>
                                                            <div className='bill-event-count'>
                                                                <div className='bill-event-down' onClick={() => {if(item.quantity > 1) {
                                                                    item.quantity--
                                                                    setReRender(reRender -1)
                                                                }}}>-</div>
                                                                <div className='bill-event-quantity'>{item.quantity}</div>
                                                                <div className='bill-event-up' onClick={() => {
                                                                        item.quantity++
                                                                        setReRender(reRender + 1)
                                                            }}>+</div>
                                                            </div>
                                                            <div className='bill-event-remove' >
                                                                <i class="fas fa-trash-alt bill-remove-icon" onClick={() => handleRemoveProductItem(item)}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                        </li>
                                    )
                                })}
                            </ul>
                            
                            <div className='row'>
                                <div className='bill-user col-8'>
                                    <div className='title-bill-user'>Người dùng: (Email)</div>
                                    <select className="form-select bill-select-user" value={userOff} onChange={(e) => {setUserOff(e.target.value)}} aria-label="Default select example">
                                        {userList.map((item,index) => {
                                            return (
                                                <option key={index} value={item.email}>{item.email}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className='bill-voucher col-4'>
                                    <div className='title-voucher'>Voucher: (%) </div>
                                    
                                    <select className="form-select bill-select-voucher" value={vcher} onChange={(e) => {setVcher(e.target.value)}} aria-label="Default select example">
                                        {voucher.map((item,index) => {
                                            return (
                                                <option key={index} value={item.disCount}>{item.disCount}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='bill-total'>
                                <div className='product-price-bill'>
                                    <div className='title-price-bill'>Tổng số tiền: </div>
                                    <div className='sum-price-bill'>{format_curency(totalBill)}đ</div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    <div className='bill-left col-6'>
                        <div className='bill-confirm'>
                            <div className='bill-header row'>
                                <div className='bill-logo col-4'>
                                    <img alt="anh" src="https://file.hstatic.net/1000358207/file/logo_eva.svg" className="bill-img" />
                                    <div className='bill-info'>Số 1 Trần Đại Nghĩa, Hà Nội, Việt Nam</div>
                                </div>
                                <div className='bill-title col-8'>  
                                        HÓA ĐƠN
                                </div>  
                            </div>
                            <div className='bill-body'>
                                <div className='info-order'>
                                    <div className='info-user'>
                                        <ul className='info-user-list'>
                                            <li className='info-user-title'>Khách hàng</li>
                                            <li className='info-user-name'><b style={{fontSize:'16px'}}>Tên:</b> {userBill.name}</li>
                                            <li className='info-user-phone'><b style={{fontSize:'16px'}}>Số điện thoại:</b> {userBill.phoneNumber}</li>
                                            <li className='info-user-email'><b style={{fontSize:'16px'}}>Gmail:</b> {userBill.email}</li>
                                            <li className='info-user-address'><b style={{fontSize:'16px'}}>Địa chỉ:</b> {userBill.address}</li>
                                        </ul>
                                        <div className='info-time-product'>{`Hà Nội, ngày ${timeBill.day} tháng ${timeBill.month} năm ${timeBill.year}`}</div>
                                    </div>
                                    <div className='info-order-product'>
                                        <table class="table bill-list-product table-borderless">
                                            <thead>
                                                <tr>
                                                <th scope="col" style={{width:'10%'}}>STT</th>
                                                <th scope="col" style={{width:'30%'}}>Tên Sản Phẩm</th>
                                                <th scope="col" style={{width:'10%'}}>Size</th>
                                                <th scope="col" style={{width:'10%'}}>Số Lượng</th>
                                                <th scope="col" style={{width:'10%'}}>Giá</th>
                                                <th scope="col" style={{width:'10%'}}>Thành Tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productBill.map((item,index) => {
                                                    return (
                                                        <tr key={index} >
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{item.name}</td>
                                                            <td>{item.size}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{format_curency(item.price)}đ</td>
                                                            <td>{format_curency(item.price * item.quantity)}đ</td>
                                                        </tr >
                                                    )
                                                })}
                                                <tr>
                                                    <th scope='row'></th>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><b>Tổng Tiền </b></td>
                                                    <td>{format_curency(totalBillNotVoucher)}đ</td>
                                                    
                                                </tr>
                                                <tr>
                                                    <th scope='row'></th>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><b>Voucher </b></td>
                                                    <td>-{format_curency(Math.round(0.01*vcher * totalBillNotVoucher))}đ</td>
                                                    
                                                </tr>
                                                <tr>
                                                    <th scope='row'></th>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td ><b style={{fontSize:'18px'}}>Tổng Bill</b></td>
                                                    <td style={{fontSize:'18px'}}>{format_curency(totalBill)}đ</td>
                                                    
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className='bill-footer'>
                                <div className='bill-footer-thanks'>Cảm ơn vì đã mua hàng của chúng tôi !</div>
                            </div>
                            
                        </div>
                        <button className='btn-export-pdf' onClick={handleExportBill}>Xuất Hóa Đơn</button>
                    </div>
                </div>
            </div>
       </div>
    )
}
const mapStateToProps = (state)  => {
    return {
        userList: state.UserList,
        product: [
            ...state.Shirt,
            ...state.Skirt,
            ...state.Dress,
            ...state.Trousers,
            ...state.Accessory
          ],
        voucher: state.Voucher
    
    }
}

export default connect(mapStateToProps)(ProductOffline);