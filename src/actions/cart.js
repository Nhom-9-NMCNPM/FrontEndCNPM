export const resetCart = () => {
    return {
        type: 'RESET-CART'
    }
}
export const addCart = ({id, name, codePro, price, size, count}) => {
    return {
        type: 'ADD-CART',
        data: {
            id,
            name,
            price,
            size,
            count,
            codePro,
        }
    }
};
export const removeCart = (id, size) => {
    return {
        type: 'REMOVE-CART',
        id,
        size
    }
}