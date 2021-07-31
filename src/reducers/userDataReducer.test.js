import { userDataReducer } from "./userDataReducer";

const initialState = {
    cartItems: [],
    cartTotal: 0,
    wishlist: []
}
const productOne = {
    "specs": [
        "Author: Avinash Inamdar",
        "Date: Aug 2016",
        "Language: English",
        "Kindle: N/A",
        "ISBN-10: 9386146584",
        "ISBN-13: 978-9386146584",
        "Item Weight: 481g",
        "Dimensions: 18.9 x 1.42 x 25 cm"
    ],
    "_id": "60923f9f55879418a8d31424",
    "category": "Books",
    "description": "The thoroughly revised and updated 2nd edition of the book 50 COOL STORIES, 3000 HOT WORDS is a unique book for Vocabulary Building, based on the Learning through Contextual Usage strategy. The book is an excellent compilation of 50 titillating stories from diverse areas like, Law, Business, Linguistics, Media, Movies, Sports, Polity, Economics, sociology, technology, Demographics, Environment, Marketing, Infrastructure, etc.",
    "images": "https://images-na.ssl-images-amazon.com/images/I/71z3hDeWDBL.jpg",
    "link": "https://amazon.in/Stories-Words-Banking-Defence-Exams/dp/9386146584",
    "name": "50 Cool Stories 3000 Hot Words",
    "price": 175,
    "rating": 3.5,
    "qty": 1
}

describe("testing cart", () => {
    it("should add to cart when a value is added", () => {
        const addToCart = {
            type: "add_to_cart",
            payload: productOne
        };
        
        let state = userDataReducer(initialState, addToCart);
        
        expect(state.cartItems).toEqual([
            productOne
        ]);

    });

    it("should find cart total", () => {
        const findCartTotal = {
            type: "find_cart_total",
        };
        
        const updatedState = {
            cartItems: [productOne],
            cartTotal: 0,
            wishlist: []
        }
        let state = userDataReducer(updatedState, findCartTotal);
        
        expect(state.cartTotal).toEqual(productOne.price);

    });
});

describe("testing update product quantity", () => {
    it("should increase quantity", () => {
        const increaseQty = {
            type: "increase_quantity",
            payload: productOne
        };
        
        const updatedState = {
            cartItems: [productOne],
            cartTotal: productOne.price,
            wishlist: []
        }
        let state = userDataReducer(updatedState, increaseQty);
        
        expect(state.cartItems.find(item => item._id === productOne._id).qty).toEqual(productOne.qty+1);

    });

    it("should decrease quantity", () => {
        const decreaseQty = {
            type: "decrease_quantity",
            payload: productOne
        };
        
        const updatedState = {
            cartItems: [productOne],
            cartTotal: productOne.price,
            wishlist: []
        }
        let state = userDataReducer(updatedState, decreaseQty);
        
        expect(state.cartItems.find(item => item._id === productOne._id).qty).toEqual(productOne.qty-1);
    });
});

describe("testing wishlist", () => {
    it("should add to wishlist", () => {
        const addToWishlist = {
            type: "add_to_wishlist",
            payload: productOne
        };
        
        let state = userDataReducer(initialState, addToWishlist);
        
        expect(state.wishlist).toEqual([
            productOne
        ]);

    });

    it("should remove from wishlist", () => {
        const removeFromWishlist = {
            type: "remove_from_wishlist",
            payload: productOne
        };
        
        let state = userDataReducer(initialState, removeFromWishlist);
        
        expect(state.wishlist).toEqual([]);

    });
});