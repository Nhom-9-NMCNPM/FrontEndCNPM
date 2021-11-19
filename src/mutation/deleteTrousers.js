import client from "../client/client";
import {gql} from '@apollo/client';
const deleteTrousers = (id)=>{
    client.mutate({
        mutation: gql `
            mutation Mutation($deleteTrousersId: Int!) {
                deleteTrousers(id: $deleteTrousersId) {
                    id
                    name
                }
            }
        `,
        variables: {
            deleteTrousersId: id
        }
    })
    .then(response =>  {
        alert("Xoa thanh cong")
        window.location.reload();
    })
    .catch(err =>  {
        alert("Hệ thống xảy ra lỗi, vui lòng thử lại!")});
}
export default deleteTrousers; 