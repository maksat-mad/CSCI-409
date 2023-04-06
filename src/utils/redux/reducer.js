const initialState = {
    navbarInput: '',
    city: localStorage.getItem('city') !== null ? localStorage.getItem('city') : 'astana',
    cartButtonClick: false,
    cartItemsNumber: 0,
    cartItemsIds: [],
    cartItems: new Map(),
    cartItemsQuantity: 0,
    cartItemsIdsAndQuantity: new Map(),
    totalMoney: 0
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
        case 'CART_ITEMS':
            return {
                ...state,
                cartItems: action.payload
            };
        case 'CART_ITEMS_QUANTITY':
            return {
                ...state,
                cartItemsQuantity: action.payload
            };
        case 'CART_ITEMS_IDS_AND_QUANTITY':
            return {
                ...state,
                cartItemsIdsAndQuantity: action.payload
            };
        case 'TOTAL_MONEY':
            return {
                ...state,
                totalMoney: action.payload
            };
        default:
            return state;
    }
};

export default reducer;