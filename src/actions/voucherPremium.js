export const startSetVoucherPremium = (voucher) => {
    return {
        type: 'START-SET-VOUCHER-PREMIUM',
        data: voucher,
    }
}
export const addVoucherPremium = (voucher) => {
    return {
        type: 'ADD-VOUCHER-PREMIUM',
        data:voucher,
    }
}
export const removeVoucherPremium = (id) => {
    return {
        type: 'REMOVE-VOUCHER-PREMIUM',
        id
    }
}
export const updateVoucherPremium = (id,voucher) => {
    return {
        type: 'UPDATE-VOUCHER-PREMIUM',
        id,
        voucher
    }
}