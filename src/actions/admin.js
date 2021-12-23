export const startSetUserList = (data) =>{
    return {
        type: 'SET-USER-LIST',
        data
    }
}
export const addUserList = (data) =>{
    return {
        type: 'ADD-USER-LIST',
        data
    }
}
export const updateUserList = (id, data) =>{
    return {
        type: 'UPDATE-USER-LIST',
        id,
        data
    }
}
export const deleteUserList = (id) =>{
    return {
        type: 'DELETE-USER-LIST',
        id
    }
}