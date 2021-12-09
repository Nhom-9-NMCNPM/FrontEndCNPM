import client from "../client/client";
import {gql} from '@apollo/client';
const deleteShirt = (item)=>{
    client.mutate({
        mutation: gql `
            mutation Mutation($filesName: [String], $deleteShirtId: Int!) {
                deleteFile(filesName: $filesName)
                deleteShirt(id: $deleteShirtId) {
                    id
                    name
                }
            }
        `,
        variables: {
            deleteShirtId: item.id,
            filesName: item.img.map((item, index)=>{
                return item.slice(item.length-16, item.length)
            })
        }
    })
    .catch(err =>  {
        alert("Hệ thống xảy ra lỗi, vui lòng thử lại!")});
}
export default deleteShirt; 