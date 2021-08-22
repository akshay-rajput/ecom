import React from 'react'

// create context to pass down the dispatch method
export const StoreContext = React.createContext(null);

// action constants object
export const actions = {
    INITIALISE_PRODUCTS: 'initialise_products',
    SORT_PRICE: 'sort_price',
    SHOW_ALL_PRODUCTS: 'show_all_products',
    SHOW_BOOKS: 'show_books',
    SHOW_FLASHCARDS: 'show_flashcards',
    SHOW_TOYS: 'show_toys',
}

// helper function to pass object to dispatch
export const createAction = (type, payload)=> {
    return {
        type, payload
    }
}

// reducer function which accepts state and action
export const productReducer = (state, action) => {
    console.log("called productReducer: Action - ", action.payload)
    switch (action.type) {
        case actions.INITIALISE_PRODUCTS:
            return {
                ...state, 
                productList: action.payload
            };
        case actions.SHOW_ALL_PRODUCTS:
            return {
                ...state, 
                productAppliedFilter: "All"
            };
        case actions.SORT_PRICE:
            return {
                ...state, 
                sort_price: action.payload
            };
        case actions.SHOW_BOOKS:
            return {
                ...state, 
                productAppliedFilter: "Books"
            };
        case actions.SHOW_FLASHCARDS:
            return {
                ...state, 
                productAppliedFilter: 'Flashcards'
            };
        case actions.SHOW_TOYS:
            return {
                ...state, 
                productAppliedFilter: "Toys"
            };
        default:
            return state;
    }
}