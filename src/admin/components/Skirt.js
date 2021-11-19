import { useState, useEffect } from "react"
import { connect } from "react-redux";
import { gql, useMutation } from '@apollo/client';
import Update from "../Update";
const ADD_SKIRT = gql`
        mutation Mutation($data: createSkirtInput!) {
        createSkirt(data: $data) {
            id
            name
        }
    }
`
const Skirt = ({skirt}) => {
    const [showModal, setShowModal]= useState(false);
    const [add, { data, loading, error }] = useMutation(ADD_SKIRT);
    
        const handleUpdateSkirt= () => {

        }

        const handleRemoveSkirt = () => {
            
        }
        const handleAddSkirt = () => {
            setShowModal(true);
        }
    return (
        <div className="margin-bottom">
            <h1>Skirt</h1>
            <table className="table">
                <thead>
                    <tr className="table-tr">
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
                    
                    {skirt.map((item,index) => {

                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td className='content'>{item.id}</td>
                                <td className='content'>21/2/30</td>
                                <td className='content'>21/42/3</td>
                                <td className='content'>{item.name}</td>
                                <td className='content '>{item.description}</td>
                                <td className='content content-img'>{item.img}</td>
                                <td className='content'>{item.price}</td>
                                <td className='content'>{item.codePro}</td>
                                <td className='content'>{item.size_M}</td>
                                <td className='content'>{item.size_S}</td>
                                <td className='content'>{item.size_L}</td>
                                <td className='content'>{item.size_XL}</td>
                                <td className='content'>{item.material}</td>
                                <td className='content'>{item.color}</td>
                                <td className='content'>
                                    <button 
                                        onClick={handleRemoveSkirt}
                                        className='btn-remove'
                                    >
                                        X
                                    </button>
                                    <button 
                                        className='btn-update'
                                        onClick={handleUpdateSkirt}
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
            <button className='btn-add' onClick={handleAddSkirt}>Thêm mới</button>
            <Update isDisplay={showModal} add={add} loading={loading} error={error} data={data} setShowModal={setShowModal} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        skirt: state.Skirt,
    }
}

export default connect(mapStateToProps)(Skirt)