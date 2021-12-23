export const startSetSkirt = (skirt) => {
    return {
        type: 'START-SET-SKIRT',
        data: skirt,
    }
}
export const addSkirt = (skirt) => {
    return {
        type: 'ADD-SKIRT',
        data:skirt,
    }
}
export const removeSkirt = (id) => {
    return {
        type: 'REMOVE-SKIRT',
        id
    }
}
export const updateSkirt = (id, skirt) => {
    return {
        type: 'UPDATE-SKIRT',
        id,
        skirt,
    }
}