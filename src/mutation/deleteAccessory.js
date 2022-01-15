import client from "../client/client";
import {gql} from '@apollo/client';
const deleteAccessory = (item)=>{
    client.mutate({
        mutation: gql `
            mutation Mutation($filesName: [String], $deleteAccessoryId: Int!) {
                deleteFile(filesName: $filesName)
                deleteAccessory(id: $deleteAccessoryId) {
                    id
                    name
                }
            }
        `,
        variables: {
            deleteAccessoryId: item.id,
            filesName: item.img.map((item, index)=>{
                return item.slice(item.length-16, item.length)
            })
        }
    })
    .catch(err =>  {
        alert("Hệ thống xảy ra lỗi, vui lòng thử lại!")});
}
export default deleteAccessory;