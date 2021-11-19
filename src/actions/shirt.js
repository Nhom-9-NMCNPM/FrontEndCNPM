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