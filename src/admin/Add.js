import "../style/Admin/Update.css"
import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { showSuccessToast } from "../utils/displayToastMess";
// import { ADD_SHIRT, UPDATE_SHIRT } from "./mutation/shirt";
// import { ADD_SKIRT, UPDATE_SKIRT } from "./mutation/skirt";
// import { ADD_TROUSERS, UPDATE_TROUSERS } from "./mutation/trousers";
// import { ADD_DRESS, UPDATE_DRESS } from "./mutation/derss";
import LoadingPage from '../components/LoadingPage'
const UPLOAD = gql`
    mutation Mutation($file: [Upload!]!) {
        upLoadFile(file: $file) {
            url
        }
    }
    `
const Add = ({isDisplay, add, status, setShowModalAdd}) => {
    // const [addShirt, {loading: mutationLoading, error: mutationError}] = useMutation(ADD_SHIRT);
    // const [updateShirt, {loading: mutationLoading, error: mutationError}] = useMutation(UPDATE_SHIRT);
    // const [addSkirt, {loading: mutationLoading, error: mutationError}] = useMutation(ADD_SKIRT);
    //const [isValidate, setIsValidate]=useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [code, setCode] = useState('');
    const [size_M, setSize_M] = useState(0);
    const [size_S, setSize_S] = useState(0);
    const [size_L, setSize_L] = useState(0);
    const [size_XL, setSize_XL] = useState(0);
    const [material, setMaterial] = useState('');
    const [color, setColor] = useState('');
    const [publish, setPublish] = useState(true);
    const [newPro, setNewPro] = useState(true);
    const [file,setFile] = useState([]); 
    const [avatar, setAvatar] = useState([])
    const [isLoading, setIsLoading]=useState(false);
    const [uploadFile, {loading, error}] = useMutation(UPLOAD, {
        onCompleted: (data)=>{
            console.log(data.upLoadFile.url)
            const newPrice = parseInt(price, 10);
            const numberSize_S = parseInt(size_S, 10);
            const numberSize_M = parseInt(size_M, 10);
            const numberSize_L = parseInt(size_L, 10);
            const numberSize_XL = parseInt(size_XL, 10);
            const newData = {
                name,
                description,
                price: newPrice,
                codePro: code,
                size_M:numberSize_M,
                size_L:numberSize_L,
                size_S: numberSize_S,
                size_XL:numberSize_XL,
                material,
                color,
                publish,
                newPro,
                img: data.upLoadFile.url,
            }
            add({
                variables:{data:{
                    ...newData
                }}
            })
            setName('')
            setDescription('')
            setPrice(0)
            setCode('')
            setSize_M(0)
            setSize_L(0)
            setSize_S(0)
            setSize_XL(0)
            setMaterial('')
            setColor('')
            setFile([])
        }
    })
    const onhandleUpload = (e)=>{
        setFile(e.target.files);
        setAvatar([...e.target.files].map((file)=>{
            file.preview = URL.createObjectURL(file)
            return file;
        }))
    };
    const handleClickUpload =async (e)=>{
        e.preventDefault();
            setIsLoading(true);
            await uploadFile({variables: {file}});
            setAvatar([]);
            setShowModalAdd(false);
            setIsLoading(false);
            showSuccessToast("Thêm sản phẩm thành công")
    }
    if(isLoading){
        return <LoadingPage />
    }
    return (

        <Modal
                isOpen={isDisplay} 
                className="modal-react"
                ariaHideApp={false}
            >
                <div className="modal-body-react" >
                    <div className="close-modal" onClick={()=>setShowModalAdd(false)}>
                        <i className="far fa-times-circle"></i>
                    </div>
                    <div className="container" style={{overflow: 'auto'}}>
                        <h1 className="title">THÔNG TIN SẢN PHẨM</h1>
                        <div className="info row">
                            <div className="info-left col-6 ">
                                <form class="" onSubmit={(e)=>handleClickUpload(e)}>
                                    <div class="field-info"><label htmlFor="id" class="">ID</label><input name="id" id="id" type="text" class="form-control" readOnly={true} /></div>
                                    <div class="field-info"><label htmlFor="name" class="">Tên Sản Phẩm</label><input value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                    name="name" id="name"type="text" required class="form-control"/>
                                    </div>
                                    <div class="field-info"><label htmlFor="des" class="">Mô Tả</label><input value={description}
                                    onChange={(e)=>{setDescription(e.target.value)}}
                                    name="des" id="des" required class="form-control" /></div>
                                    <div class="field-info"><label htmlFor="price" class="">Giá Tiền</label><input value={price}
                                    onChange={(e)=>{setPrice(e.target.value)}}
                                    name="price" id="price" type="number" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="code-pro" class="">Mã Sản Phẩm</label><input value={code}
                                    onChange={(e)=>{setCode(e.target.value)}}
                                    name="code-pro" id="code-pro" type="text" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="size-M" class="">Size-M</label><input value={size_M}
                                    onChange={(e)=>{setSize_M(e.target.value)}}
                                    name="size-M" id="size-M" type="number" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="size-S" class="">Size-S</label><input value={size_S} name="size-S"
                                    onChange={(e)=>{setSize_S(e.target.value)}}
                                    id="size-S" type="number" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="size-L" class="">Size-L</label><input value={size_L} name="size-L"
                                    onChange={(e)=>{setSize_L(e.target.value)}}
                                    id="size-L" type="number" class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="size-XL" class="">Size-XL</label><input value={size_XL}
                                    onChange={(e)=>{setSize_XL(e.target.value)}}
                                    name="size-XL" id="size-XL" type="number" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="material" class="">Chất liệu</label><input value={material}
                                    onChange={(e)=>{setMaterial(e.target.value)}}
                                    name="material" id="material" type="text" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="color" class="">Màu Sắc</label><input value={color} 
                                    onChange={(e)=>{setColor(e.target.value)}}
                                    name="color" id="color" type="text" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="img" class="">Image</label><input 
                                    onChange={(e)=>onhandleUpload(e)}
                                    name="file" id="img" required type="file" class="form-control-file" multiple />
                                    </div>
                                    <button type="submit" class="mt-1 btn btn-success">Thêm mới</button>
                                </form>
                            </div>
                            <div className="col-6 row">
                                {avatar.length>0 && (
                                    avatar.map((item, index) =>(
                                        <div key={index} className="col-6 img-product">
                                            <i class="fas fa-times img-cancel"></i>
                                            <img src={item.preview} alt=""  />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            
            </Modal>


        
    )
}

export default Add
