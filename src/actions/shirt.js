export const startSetShirt = (shirt) => {
    return {
        type: 'START-SET-SHIRT',
        data: shirt,
    }
}
export const addShirt = (shirt) => {
    return {
        type: 'ADD-SHIRT',
        data:shirt,
    }
}
export const removeShirt = (id) => {
    return {
        type: 'REMOVE-SHIRT',
        id
    }
}
export const updateShirt = (id,shirt) => {
    return {
        type: 'UPDATE-SHIRT',
        id,
        shirt
    }
}