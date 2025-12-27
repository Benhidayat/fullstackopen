const filterReducer = (state = '', action) => {
    console.log('FILTER', state);
    switch (action.type) {
        case 'FILTER':
            return action.payload
        default:
            return state
    }
};

export const createFilter = (filter) => {
    return {
        type: 'FILTER',
        payload: filter
    }
}

export default filterReducer;