export const startSetVoucher = (voucher) => {
    return {
        type: 'START-SET-VOUCHER',
        data: voucher,
    }
}
export const addVoucher = (voucher) => {
    return {
        type: 'ADD-VOUCHER',
        data:voucher,
    }
}
export const removeVoucher = (id) => {
    return {
        type: 'REMOVE-VOUCHER',
        id
    }
}
export const updateVoucher = (id,voucher) => {
    return {
        type: 'UPDATE-VOUCHER',
        id,
        voucher
    }
}