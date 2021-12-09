export const startSetOrder = (order) => {
    return {
        type: 'START-SET-ORDER',
        data: order,
    }
}

export const updateHistoryOrder = (order) => {
    return {
        type : 'UPDATE-HISTORY-ORDER',
        data: {
             ...order,
            },
    }
}
