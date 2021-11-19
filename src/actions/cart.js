export const resetCart = () => {
    return {
        type: 'RESET-CART'
    }
}
export const addCart = ({id, name,img,color, codePro, price, size, count}) => {
    return {
        type: 'ADD-CART',
        data: {
            id,
            name,
            img,
            color,
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