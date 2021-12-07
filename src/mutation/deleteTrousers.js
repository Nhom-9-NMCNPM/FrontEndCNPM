import client from "../client/client";
import {gql} from '@apollo/client';
const deleteTrousers = (item)=>{
    client.mutate({
        mutation: gql `
            mutation Mutation($filesName: [String], $deleteTrousersId: Int!) {
                deleteFile(filesName: $filesName)
                deleteTrousers(id: $deleteTrousersId) {
                    id
                    name
                }
            }
        `,
        variables: {
            deleteTrousersId: item.id,
            filesName: item.img.map((item, index)=>{
                return item.slice(item.length-16, item.length)
            })
        }
    })
    .catch(err =>  {
        alert("Hệ thống xảy ra lỗi, vui lòng thử lại!")});
}
export default deleteTrousers; 