import "../style/Admin/Update.css"
import React, { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client';
import { useState} from "react";
import Modal from "react-modal";

const UPLOAD = gql`
    mutation Mutation($file: [Upload!]!) {
        upLoadFile(file: $file) {
            url
        }
    }
    `
const Update = ({isDisplay, update, loading,error, setShowModalUpdate, product}) => {
    console.log(product)
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [code, setCode] = useState(product.codePro);
    const [size_M, setSize_M] = useState(product.size_M);
    const [size_S, setSize_S] = useState(product.size_S);
    const [size_L, setSize_L] = useState(product.size_L);
    const [size_XL, setSize_XL] = useState(product.size_XL);
    const [material, setMaterial] = useState(product.material);
    const [color, setColor] = useState(product.color);
    const [publish, setPublish] = useState(true);
    const [newPro, setNewPro] = useState(true);
    const [file,setFile] = useState([]);
    const [avatar, setAvatar] = useState([])
    useEffect(() => {   
        return() => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])
    const handlePreviewAvatar = (e) => {
        const file = e.target.files
        file.preview = URL.createObjectURL(file)
        console.log(file.preview);
        setAvatar(file)
    }
    const [uploadFile] = useMutation(UPLOAD, {
        onCompleted: (data)=>{
            const newPrice = parseInt(price, 10);
            const numberSize_S = parseInt(size_S, 10);
            const numberSize_M = parseInt(size_M, 10);
            const numberSize_L = parseInt(size_L, 10);
            const numberSize_XL = parseInt(size_XL, 10);
            update({
                variables:{
                    data:{
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
                    },
                    updateShirtId: product.id
                }
            })
            setShowModalUpdate(false);
            alert("Sửa thành công!");
            window.location.reload();
        }
    })
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;
    const onhandleUpload = (e)=>{
        setFile(e.target.files);
        if(!file) return
    };
    const handleClickUpload = (e)=>{
        e.preventDefault();
        if(!file){
            const newPrice = parseInt(price, 10);
            const numberSize_S = parseInt(size_S, 10);
            const numberSize_M = parseInt(size_M, 10);
            const numberSize_L = parseInt(size_L, 10);
            const numberSize_XL = parseInt(size_XL, 10);
            update({
                variables:{
                    data:{
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
                    },
                    updateShirtId: product.id
                }
            })
            setShowModalUpdate(false);
            alert("Sửa thành công!");
            window.location.reload();
        }else{
            uploadFile({variables: {file}});
        }
      
    }
   
    return (

        <Modal
                isOpen={isDisplay} 
                className="modal-react"
                ariaHideApp={false}
            >
                <div className="modal-body-react" >
                    <div className="close-modal" onClick={()=>setShowModalUpdate(false)}>
                        <i className="far fa-times-circle"></i>
                    </div>
                    <div className="container" style={{overflow: 'auto'}}>
                        <h1 className="title">THÔNG TIN SẢN PHẨM</h1>
                        <div className="info row">
                            <div className="info-left col-6 ">
                                <form class="">
                                    <div class="field-info"><label htmlFor="id" class="">ID</label><input name="id" id="id" type="text" class="form-control" readOnly={true} /></div>
                                    <div class="field-info"><label htmlFor="name" class="">Tên Sản Phẩm</label><input value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                    name="name" id="name"type="text" required class="form-control"/>
                                    </div>
                                    <div class="field-info"><label htmlFor="des" class="" type="text">Mô tả</label><input value={description}
                                    onChange={(e)=>{setDescription(e.target.value)}}
                                    name="des" id="des" required class="form-control" /></div>
                                    <div class="field-info"><label htmlFor="price" class="">Giá tiền</label><input value={price}
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
                                    <div class="field-info"><label htmlFor="color" class="">Màu sắc</label><input value={color} 
                                    onChange={(e)=>{setColor(e.target.value)}}
                                    name="color" id="color" type="text" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="img" class="">Ảnh</label><input 
                                    onChange={(e) => {
                                        onhandleUpload(e)
                                        handlePreviewAvatar(e)
                                    }}
                                    name="file" id="img" required type="file" class="form-control-file" multiple />
                                    </div>
                                    <button class="mt-1 btn btn-primary" onClick={(e)=>handleClickUpload(e)}>Thêm mới</button>
                                </form>
                            </div>
                            <div className="col-6 row">
                                {product.img.map((item, index) => {
                                    return (
                                        <div className="col-6 img-product">
                                            <img src={item} alt="" width="50%" height="100%"/>
                                        </div>
                                    )
                                }) }
                                {avatar && (
                                    <div className="col-6 img-product"><img src={avatar.preview} alt="" width="50%" height="100%" /></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            
            </Modal>



        
    )
}

export default Update
