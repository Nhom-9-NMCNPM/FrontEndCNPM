import client from "../client/client";
import {gql} from '@apollo/client';
const deleteDress = (id)=>{
    client.mutate({
        mutation: gql `
            mutation Mutation($deleteDressId: Int!) {
                deleteDress(id: $deleteDressId) {
                    id
                    name
                }
            }
        `,
        variables: {
            deleteDressId: id
        }
    })
    .then(response =>  {
        alert("Xoa thanh cong")
        window.location.reload();
    })
    .catch(err =>  {
        alert("Hệ thống xảy ra lỗi, vui lòng thử lại!")});
}
export default deleteDress; 