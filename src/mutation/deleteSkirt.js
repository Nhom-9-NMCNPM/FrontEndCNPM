import client from "../client/client";
import {gql} from '@apollo/client';
const deleteSkirt = (id)=>{
    client.mutate({
        mutation: gql `
            mutation Mutation($deleteSkirtId: Int!) {
                deleteSkirt(id: $deleteSkirtId) {
                    id
                    name
                }
            }
        `,
        variables: {
            deleteSkirtId: id
        }
    })
    .then(response =>  {
        alert("Xoa thanh cong")
        window.location.reload();
    })
    .catch(err =>  {
        alert("Hệ thống xảy ra lỗi, vui lòng thử lại!")});
}
export default deleteSkirt; 