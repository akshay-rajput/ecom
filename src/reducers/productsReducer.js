import React from 'react'

// create context to pass down the dispatch method
export const StoreContext = React.createContext(null);

// action constants object
export const actions = {
    SORT_PRICE: 'sort_price',
    SHOW_ALL_PRODUCTS: 'show_all_products',
    SHOW_GSTFREE: 'show_gstfree',
  
}

// helper function to pass object to dispatch
export const createAction = (type, payload)=> {
    return {
        type, payload
    }
}

// reducer function which accepts state and action
export const productReducer = (state, action) => {
    switch (action.type) {
        case actions.SHOW_ALL_PRODUCTS:
            return {
                ...state, 
                show_all_products: !state.show_all_products
            };
        case actions.SORT_PRICE:
            return {
                ...state, 
                sort_price: action.payload
            };
        case actions.SHOW_GSTFREE:
            return {
                ...state, 
                show_gstfree: !state.show_gstfree
            };
        default:
            return state;
    }
}