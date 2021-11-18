import "../style/Admin/Update.css"
import React from 'react'
const Update = () => {
    return (
        <div className="container">
            <h1 className="title">THÔNG TIN SẢN PHẨM</h1>
            <div className="info row">
                <div className="info-left col-12 ">
                    <form class="">
                        <div class="field-info"><label for="id" class="">ID</label><input name="id" id="id" type="text" class="form-control" readOnly={true} /></div>
                        <div class="field-info"><label for="name" class="">Name</label><input name="name" id="name"type="text" class="form-control"/>
                        </div>
                        <div class="field-info"><label for="des" class="">Description</label><input name="des" id="des" class="form-control" /></div>
                        <div class="field-info"><label for="price" class="">Price</label><input name="price" id="price"type="number" class="form-control"/></div>
                        <div class="field-info"><label for="code-pro" class="">Code Pro</label><input name="code-pro" id="code-pro"type="text" class="form-control"/></div>
                        <div class="field-info"><label for="size-M" class="">Size-M</label><input name="size-M" id="size-M"type="number" class="form-control"/></div>
                        <div class="field-info"><label for="size-S" class="">Size-S</label><input name="size-S" id="size-S"type="number" class="form-control"/></div>
                        <div class="field-info"><label for="size-L" class="">Size-L</label><input name="size-L" id="size-L"type="number" class="form-control"/></div>
                        <div class="field-info"><label for="size-XL" class="">Size-XL</label><input name="size-XL" id="size-XL"type="text" class="form-control"/></div>
                        <div class="field-info"><label for="material" class="">Material</label><input name="material" id="material"type="text" class="form-control"/></div>
                        <div class="field-info"><label for="color" class="">Color</label><input name="color" id="color"type="text" class="form-control"/></div>
                        <div class="field-info"><label for="img" class="">Image</label><input name="file" id="img" type="file" class="form-control-file" />
                        </div>
                        <button class="mt-1 btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Update
