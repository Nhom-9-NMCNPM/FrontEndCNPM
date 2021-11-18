import { useState, useEffect } from "react"
import Update from "../Update"
const Dress = () => {
    const [count, setCount] = useState(1)

    const [showUpdate, setShowUpdate] = useState(false)

    const openUpdate = () => {
        setShowUpdate(!showUpdate) 
    }
    return (
        <div>
            <h1>Dress</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">id</th>
                        <th scope="col">CreatedAt</th>
                        <th scope="col">UpdatedAt</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Img</th>
                        <th scope="col">Price</th>
                        <th scope="col">CodePro</th>
                        <th scope="col">Size_M</th>
                        <th scope="col">Size_S</th>
                        <th scope="col">Size_L</th>
                        <th scope="col">Size_XL</th>
                        <th scope="col">Materrial</th>
                        <th scope="col">Color</th>
                        <th scope="col">Event</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{count}</th>
                        <td className='content'>dddddddddddddddddddddddddddddddddđ</td>
                        <td className='content'>Otto</td>
                        <td className='content'>@mdo</td>
                        <td className='content'>Mark</td>
                        <td className='content'>Otto</td>
                        <td className='content'>@mdo</td>
                        <td className='content'>Mark</td>
                        <td className='content'>Otto</td>
                        <td className='content'>@mdo</td>
                        <td className='content'>Mark</td>
                        <td className='content'>Otto</td>
                        <td className='content'>@mdo</td>
                        <td className='content'>Mark</td>
                        <td className='content'>Otto</td>
                        <td className='content'>
                            <button 
                               
                                className='btn-remove'
                            >
                                X
                            </button>
                            <button 
                                className='btn-update'
                                onClick={openUpdate}
                            >
                                Sửa
                            </button>
                        </td>
                    </tr>
                 
                </tbody>
            </table>
            <button className='btn-add'  onClick={openUpdate}>Thêm mới</button>

            {showUpdate && <Update />}
        </div>
    )
}

export default Dress