export const startSetDress = (dress) => {
    return {
        type: 'START-SET-DRESS',
        data: dress,
    }
}
export const addDress = (dress) => {
    return {
        type: 'ADD-DRESS',
        data:dress,
    }
}
export const removeDress = (id) => {
    return {
        type: 'REMOVE-DRESS',
        id
    }
}
export const updateDress = (id,dress) => {
    return {
        type: 'UPDATE-DRESS',
        id,
        dress
    }
}