export const startSetTrousers = (trousers) => {
    return {
        type: 'START-SET-TROUSERS',
        data: trousers,
    }
}
export const addTrousers = (trousers) => {
    return {
        type: 'ADD-SHIRT',
        data:trousers,
    }
}
export const removeTrousers = (id) => {
    return {
        type: 'REMOVE-TROUSERS',
        id
    }
}
export const updateTrousers = (id, trousers) => {
    return {
        type: 'UPDATE-TROUSERS',
        id,
        trousers
    }
}