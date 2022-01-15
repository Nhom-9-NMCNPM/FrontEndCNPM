import "../style/Admin/Update.css"
import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import Modal from "react-modal";
import LoadingPage from "../components/LoadingPage";
import { showSuccessToast } from "../utils/displayToastMess";
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
const Update_acc = ({isDisplay, update, status, setShowModalUpdate, product}) => {
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [code, setCode] = useState(product.codePro);
    const [count, setCount] = useState(product.count);
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
            const numberCount = parseInt(count, 10);
            update({
                variables:{
                    data:{
                        name,
                        description,
                        price: newPrice,
                        codePro: code,
                        count: numberCount,
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
            const numberCount = parseInt(count, 10);
            await update({
                variables:{
                    data:{
                        name,
                        description,
                        price: newPrice,
                        codePro: code,
                        count: numberCount,
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
        showSuccessToast("Chỉnh sửa thành công")
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
                        
                                    <div class="field-info"><label htmlFor="count" class="">Số lượng</label><input value={count}
                                    onChange={(e)=>{setCount(e.target.value)}}
                                    name="count" id="count" type="number" required class="form-control"/></div>
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

export default Update_acc
