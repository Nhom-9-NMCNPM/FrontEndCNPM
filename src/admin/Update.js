import "../style/Admin/Update.css"
import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import Modal from "react-modal";
import LoadingPage from "../components/LoadingPage";

const UPLOAD = gql`
    mutation Mutation($file: [Upload!]!) {
        upLoadFile(file: $file) {
            url
        }
    }
    `
const DELETE_IMG = gql`
    mutation Mutation($filesName: [String]) {
        deleteFile(filesName: $filesName)
    }
`
const Update = ({isDisplay, update, status, setShowModalUpdate, product}) => {
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
    const [isLoading, setIsLoading] = useState(false);
    const [arrImage, setArrImage] = useState(product.img);
    const [arrImageDelete, setArrImageDelete] = useState([]);

    useEffect(() => {   
        return() => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])
    const [deleteImg] = useMutation(DELETE_IMG);
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
                        img: [...data.upLoadFile.url, ...arrImage],
                    },
                    proId: product.id
                }
            })
            setShowModalUpdate(false);
            alert("Sửa thành công!");
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
        if(arrImageDelete.length>0) {
            deleteImg({
                variables:{
                    filesName:arrImageDelete
                }
            })
        }
        if(file.length===0){
            const newPrice = parseInt(price, 10);
            const numberSize_S = parseInt(size_S, 10);
            const numberSize_M = parseInt(size_M, 10);
            const numberSize_L = parseInt(size_L, 10);
            const numberSize_XL = parseInt(size_XL, 10);
            await update({
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
                        img:[...arrImage]
                    },
                    proId: product.id
                }
            })
        }else{
            await uploadFile({variables: {file}});
        }
        setShowModalUpdate(false)
        setIsLoading(false)
    }
    if(isLoading){
        return <LoadingPage />
    }
    const handleDeleteImg = (item) => {
        setArrImage(arrImage.filter(img => img!==item));
        setArrImageDelete([...arrImageDelete, item]);
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
                                <form class="" onSubmit={(e)=>handleClickUpload(e)}>
                                    <div class="field-info"><label htmlFor="id" class="">ID</label><input name="id" id="id" type="text" class="form-control" readOnly={true} /></div>
                                    <div class="field-info"><label htmlFor="name" class="">Tên Sản Phẩm</label><input value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                    name="name" id="name"type="text" required class="form-control"/>
                                    </div>
                                    <div class="field-info"><label htmlFor="des" class="" type="text">Mô Tả</label><input value={description}
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
                                    <div class="field-info"><label htmlFor="material" class="">Chất Liệu</label><input value={material}
                                    onChange={(e)=>{setMaterial(e.target.value)}}
                                    name="material" id="material" type="text" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="color" class="">Màu Sắc</label><input value={color} 
                                    onChange={(e)=>{setColor(e.target.value)}}
                                    name="color" id="color" type="text" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="img" class="">Ảnh</label><input 
                                    onChange={(e) => {
                                        onhandleUpload(e)
                                    }}
                                    name="file" id="img"  type="file" class="form-control-file" multiple />
                                    </div>
                                    <button type="submit" class="mt-1 btn btn-primary" >Sửa</button>
                                </form>
                            </div>
                            <div className="col-6 row">
                                {arrImage.map((item, index) => {
                                    return (
                                        <div className="col-6 img-product" key={index}>
                                             <i class="fas fa-times img-cancel" onClick={() =>handleDeleteImg(item)} ></i>
                                            <img src={item} alt="" width="50%" />
                                        </div>
                                    )
                                }) }
                                {avatar.length>0 && (
                                    avatar.map((item, index) =>(
                                        <div key={index} className="col-6 img-product">
                                            <i class="fas fa-times img-cancel"></i>
                                            <img src={item.preview} alt="" width="50%"  />
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

export default Update
