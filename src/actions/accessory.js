export const startSetAccessory = (accessory) => {
    return {
        type: 'START-SET-ACCESSORY',
        data: accessory,
    }
}
export const addAccessory = (accessory) => {
    return {
        type: 'ADD-ACCESSORY',
        data: accessory,
    }
}
export const removeAccessory = (id) => {
    return {
        type: 'REMOVE-ACCESSORY',
        id
    }
}
export const updateAccessory = (id, accessory) => {
    return {
        type: 'UPDATE-ACCESSORY',
        id,
        accessory,
    }
}