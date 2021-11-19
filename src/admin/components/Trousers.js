import { useState} from "react"
import { gql, useMutation } from '@apollo/client';
import Add from "../Add";
import Update from "../Update";
import { connect } from "react-redux";
import deleteTrousers from "../../mutation/deleteTrousers";
const ADD_TROUSERS = gql`
    mutation Mutation($data: createTrousersInput!) {
        createTrousers(data: $data) {
            id
            name
        }
    }
`;
const UPDATE_TROUSERS = gql`
    mutation Mutation($data: updateTrousersInput!, $updateTrousersId: Int!) {
        updateTrousers(data: $data, id: $updateTrousersId) {
            id
            name
        }
    }
`;
const Trousers = ({trousers}) => {
    const [showModalAdd, setShowModalAdd]= useState(false);
    const [flag, setFlag] = useState(0);
    const [showModalUpdate, setShowModalUpdate]= useState(false);
    const [update, { data_update, loading_update, error_update }] = useMutation(UPDATE_TROUSERS);
    const [add, { data, loading, error }] = useMutation(ADD_TROUSERS);
    
        
        const handleUpdateTrousers = (id) => {
            setFlag(id);
            setShowModalUpdate(true);
        }

        const handleRemoveTrousers = (id) => {
            deleteTrousers(id);
        }
        const handleAddTrousers = () => {
            setShowModalAdd(true);
        }
    return (
        <div className="margin-bottom">
            <h1>Trousers</h1>
            <table class="table">
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
                {trousers.map((item,index) => {

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
                                        onClick={()=>handleRemoveTrousers(item.id)}
                                        className='btn-remove'
                                    >
                                        X
                                    </button>
                                    <button 
                                        className='btn-update'
                                        onClick={()=>handleUpdateTrousers(item.id)}
                                    >
                                        Sửa
                                    </button>
                                    {showModalUpdate&&(flag===item.id)&&<Update isDisplay={showModalUpdate} update={update} loading={loading_update} error={error_update}  setShowModalUpdate={setShowModalUpdate} product={item}/>}
                                </td>
                            </tr>
                        )
                        })}

                    </tbody>
                </table>

            <button className='btn-add' onClick={handleAddTrousers}>Thêm mới</button>
            <Add isDisplay={showModalAdd} add={add} loading={loading} error={error}  setShowModalAdd={setShowModalAdd} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        trousers: state.Trousers,
    }
}

export default connect(mapStateToProps)(Trousers)