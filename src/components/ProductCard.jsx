import React, {useContext} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import {checkExistanceInArray} from '../store/checkExistanceInArray'
import {userActions, createUserAction, userDataContext} from '../reducers/userDataReducer'

export default function ProductCard({product, changeTab}) {
    // access userData state
    const userDataStore = useContext(userDataContext)
    const userDataState = userDataStore.userDataState
    const userDataDispatch = userDataStore.userDataDispatch
    
    
    function addToCart(item){
        console.log('dispatched add to cart with ', item);
        if(!checkExistanceInArray(userDataState.cartItems, item._id)){
            item.qty = 1;
            userDataDispatch(createUserAction(userActions.ADD_TO_CART, item))
            userDataDispatch(createUserAction(userActions.FIND_CARTTOTAL))
        }
        // else{
        //     // open cart
        //     // changeTab('Cart')
        // }
    }
    function addToWishlist(item){
        // if not in wishlist, add
        if(!checkExistanceInArray(userDataState.wishlist, item._id)){
            userDataDispatch(createUserAction(userActions.ADD_TO_WISHLIST, item))
        }
        else{
            userDataDispatch(createUserAction(userActions.REMOVE_FROM_WISHLIST, item))
        }
    }

    return (
        <div className='product-card displayFlex flexCol border borderTeal5 rounded pb2'>
            <div className='image-wrapper displayFlex itemsCenter justifyCenter rounded p2'>
                <img src={product.images} alt={product.name} className="product-card-image mb2"/>
            </div>
            
            <div className="product-data flexGrow displayFlex flexCol justifyBetween">
                <div className="product-info displayFlex flexCol">
                    <Link to={`/product/${product._id}`} className="pl2 pr2 textWhite hover:textTeal4 mb2">{product.name}</Link>
                    
                    <span className="pl2 pr2 mb2 fontSemiBold">&#8377; {product.price}</span>
                    <div className="pl2 pr2 textXs mb2 displayFlex flexWrap justifyBetween itemsCenter ">
                        <span className="">Category: {product.category}</span>
                        <span className="">Rating: {product.rating}</span>
                    </div>
                </div>
                <div className="pl2 pr2 product-actions displayGrid gridCols4 gridGap1 mt2">
                    {
                        checkExistanceInArray(userDataState.cartItems, product._id) ?
                        <Link to='/cart' className="textCenter p1 bgGray5 border borderTeal3 gridColSpan3 md:gridColSpan3 textWhite rounded">
                            Go to Cart
                        </Link>
                        : 
                        <button onClick={()=> addToCart(product)} className=" p1 bgTeal6 hover:bgTeal5 border borderTeal3 gridColSpan3 md:gridColSpan3 textWhite rounded">
                            Add to cart
                        </button>
                    }
                    
                    <button onClick={() => addToWishlist(product)} className='displayFlex justifyCenter itemsCenter bgTransparent border borderTeal4 gridColSpan1 md:gridColSpan1 rounded p2'>
                        <i className={checkExistanceInArray(userDataState.wishlist, product._id) ? 'fas fa-heart textRed3 textRg': 'far fa-heart textRed3 textRg'}></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
