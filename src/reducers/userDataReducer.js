import React from 'react'

// create context to pass down the dispatch method
export const userDataContext = React.createContext(null);

export const userActions = {
    ADD_TO_CART: 'add_to_cart',
    ADD_TO_WISHLIST: 'add_to_wishlist',
    REMOVE_FROM_CART: 'remove_from_cart',
    REMOVE_FROM_WISHLIST: 'remove_from_wishlist',
    INC_QTY: 'increase_quantity',
    DEC_QTY: 'decrease_quantity',
    FIND_CARTTOTAL: 'find_cart_total'
}

// helper function to pass object to dispatch
export const createUserAction = (type, payload)=> {
    return {
        type, payload
    }
}


// reducer function which accepts userDataState and action
export const userDataReducer = (userDataState, action) => {
    const {type, payload} = action
    const product = payload;

    switch (type) {
        case userActions.INC_QTY:
            return {
                ...userDataState,
                cartItems: userDataState.cartItems.map((item) => {
                    return item._id === product._id ? { ...item, qty: item.qty + 1 } : item;
                })
            };
        case userActions.DEC_QTY:
            return {
                ...userDataState,
                cartItems: userDataState.cartItems.map((item) => {
                    return item._id === product._id ? { ...item, qty: item.qty - 1 } : item;
                })
            };
        case userActions.REMOVE_FROM_CART:
            return {
                ...userDataState,
                cartItems: userDataState.cartItems.filter((item) => item._id !== product._id)
            };
        case userActions.ADD_TO_CART:
            return {
                ...userDataState,
                cartItems: userDataState.cartItems.concat(product)
            };
        case userActions.REMOVE_FROM_WISHLIST:
            return {
                ...userDataState,
                wishlist: userDataState.wishlist.filter((item) => item._id !== product._id)
            };
        case userActions.ADD_TO_WISHLIST:
            return {
                ...userDataState,
                wishlist: userDataState.wishlist.concat(product)
            };
        case userActions.FIND_CARTTOTAL:
            return {
                ...userDataState,
                cartTotal: userDataState.cartItems.reduce(function (total, currentItem) {
                    // console.log('finding total...', total + (currentItem.price * currentItem.qty))
                    return total + (currentItem.price * currentItem.qty)
                  }, 0)
            };
        default:
            console.log('return default')
            return userDataState;
    }
}