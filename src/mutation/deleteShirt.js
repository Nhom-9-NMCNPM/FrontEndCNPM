import client from "../client/client";
import {gql} from '@apollo/client';
const deleteShirt = (id)=>{
    client.mutate({
        mutation: gql `
            mutation Mutation($deleteShirtId: Int!) {
                deleteShirt(id: $deleteShirtId) {
                    id
                    name
                }
            }
        `,
        variables: {
            deleteShirtId: id
        }
    })
    .catch(err =>  {
        alert("Hệ thống xảy ra lỗi, vui lòng thử lại!")});
}
export default deleteShirt; 