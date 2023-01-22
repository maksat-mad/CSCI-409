const initialState = {
    navbarInput: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_NAVBAR_INPUT':
            return {
                ...state,
                navbarInput: action.payload
            };
        default:
            return state;
    }
};

export default reducer;