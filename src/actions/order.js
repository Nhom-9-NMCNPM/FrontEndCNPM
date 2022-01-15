export const startSetOrder = (order) => {
    return {
        type: 'START-SET-ORDER',
        data: order,
    }
}

export const updateHistoryOrder = (id,order) => {
    return {
        type : 'UPDATE-HISTORY-ORDER',
        id,
        data: {
             ...order,
        },
    }
}
