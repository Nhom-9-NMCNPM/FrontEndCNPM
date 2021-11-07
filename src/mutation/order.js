import client from "../client/client";
import {gql} from '@apollo/client';
const order = (newOrder)=>{
    client.mutate({
        mutation: gql `
            mutation Mutation($data: createOrderInput!) {
                createOrder(data: $data) {
                    listPro
                    price
                    status
                }
            }
        `,
        variables: {
            data: newOrder
        }
    }).then(response =>  alert("Đặt hàng thành công!Cảm ơn đã sử dụng dịch vụ."))
    .catch(err =>  alert("Hệ thống xảy ra lỗi, vui lòng thử lại!"));
}
export default order; 