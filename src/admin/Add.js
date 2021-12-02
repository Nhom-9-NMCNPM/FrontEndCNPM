import "../style/Admin/Update.css"
import React from 'react'
import { gql, useMutation } from '@apollo/client';
import { useState } from "react";
import Modal from "react-modal";
import LoadingPage from '../components/LoadingPage'
const UPLOAD = gql`
    mutation Mutation($file: [Upload!]!) {
        upLoadFile(file: $file) {
            url
        }
    }
    `
const Add = ({isDisplay, add, status, setShowModalAdd}) => {
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
            setShowModalAdd(false);
            alert("Thêm thành công!");
        }
    })
    if(loading) return <LoadingPage />;
    if(error) return `Submission error! ${error.message}`;
    if(status.loading) return <LoadingPage />
    if (status.error) return `Submission error! ${status.error.message}`;
    const onhandleUpload = (e)=>{
        setFile(e.target.files);
        if(!file) return
    };
    const handleClickUpload = (e)=>{
        e.preventDefault();
        uploadFile({variables: {file}});
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
                            <div className="info-left col-12 ">
                                <form class="">
                                    <div class="field-info"><label htmlFor="id" class="">ID</label><input name="id" id="id" type="text" class="form-control" readOnly={true} /></div>
                                    <div class="field-info"><label htmlFor="name" class="">Name</label><input value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                    name="name" id="name"type="text" required class="form-control"/>
                                    </div>
                                    <div class="field-info"><label htmlFor="des" class="">Description</label><input value={description}
                                    onChange={(e)=>{setDescription(e.target.value)}}
                                    name="des" id="des" required class="form-control" /></div>
                                    <div class="field-info"><label htmlFor="price" class="">Price</label><input value={price}
                                    onChange={(e)=>{setPrice(e.target.value)}}
                                    name="price" id="price" type="number" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="code-pro" class="">Code Pro</label><input value={code}
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
                                    <div class="field-info"><label htmlFor="material" class="">Material</label><input value={material}
                                    onChange={(e)=>{setMaterial(e.target.value)}}
                                    name="material" id="material" type="text" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="color" class="">Color</label><input value={color} 
                                    onChange={(e)=>{setColor(e.target.value)}}
                                    name="color" id="color" type="text" required class="form-control"/></div>
                                    <div class="field-info"><label htmlFor="img" class="">Image</label><input 
                                    onChange={onhandleUpload}
                                    name="file" id="img" required type="file" class="form-control-file" multiple />
                                    </div>
                                    <button class="mt-1 btn btn-primary" onClick={(e)=>handleClickUpload(e)}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            
            </Modal>



        
    )
}

export default Add
