const initialState = {
    navbarInput: '',
    city: 'Astana',
    cartButtonClick: false,
    cartItemsNumber: 0,
    cartItemsIds: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_NAVBAR_INPUT':
            return {
                ...state,
                navbarInput: action.payload
            };
        case 'UPDATE_CITY':
            return {
                ...state,
                city: action.payload
            };
        case 'CART_BUTTON_CLICK':
            return {
                ...state,
                cartButtonClick: action.payload
            };
        case 'CART_ITEMS_NUMBER':
            return {
                ...state,
                cartItemsNumber: action.payload
            };
        case 'CART_ITEMS_IDS':
            return {
                ...state,
                cartItemsIds: action.payload
            };
        default:
            return state;
    }
};

export default reducer;