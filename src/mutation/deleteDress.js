import client from "../client/client";
import {gql} from '@apollo/client';
const deleteDress = (item)=>{
    client.mutate({
        mutation: gql `
            mutation Mutation($filesName: [String], $deleteDressId: Int!) {
                deleteFile(filesName: $filesName)
                deleteDress(id: $deleteDressId) {
                    id
                    name
                }
            }
        `,
        variables: {
            deleteDressId: item.id,
            filesName: item.img.map((item, index)=>{
                return item.slice(item.length-16, item.length)
            })
        }
    })
    .catch(err =>  {
        alert("Hệ thống xảy ra lỗi, vui lòng thử lại!")});
}
export default deleteDress; 