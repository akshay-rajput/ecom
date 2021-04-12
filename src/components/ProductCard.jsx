import React, {useContext} from 'react'
import {checkExistanceInArray} from '../store/checkExistanceInArray'
import {userActions, createUserAction, userDataContext} from '../reducers/userDataReducer'

export default function ProductCard({product, changeTab}) {
    // access userData state
    const userDataStore = useContext(userDataContext)
    const userDataState = userDataStore.userDataState
    const userDataDispatch = userDataStore.userDataDispatch
    
    
    function addToCart(item){
        console.log('dispatched add to cart with ', item);
        if(!checkExistanceInArray(userDataState.cartItems, item.id)){
            item.qty = 1;
            userDataDispatch(createUserAction(userActions.ADD_TO_CART, item))
            userDataDispatch(createUserAction(userActions.FIND_CARTTOTAL))
        }
        else{
            // open cart
            changeTab('Cart')
        }
    }
    function addToWishlist(item){
        // if not in wishlist, add
        if(!checkExistanceInArray(userDataState.wishlist, item.id)){
            userDataDispatch(createUserAction(userActions.ADD_TO_WISHLIST, item))
        }
        else{
            userDataDispatch(createUserAction(userActions.REMOVE_FROM_WISHLIST, item))
        }
    }

    return (
        <div className='displayFlex flexCol border borderTeal5 rounded p2'>
            <label className='textSm mb2'>{product.name}</label>
            <div className='image-wrapper flexGrow'>
                <img src={product.image} alt={product.name} className="wFull rounded mb2"/>
            </div>
            <span className="mb2 fontSemiBold">$ {product.price}</span>
            <div className="textXs mb2 displayFlex flexWrap justifyBetween itemsCenter ">
                <span className="">GST: {product.gst}</span>
                <span className="">{product.inStock ? 'In stock': 'Out of stock'}</span>
            </div>
            <div className="product-actions displayGrid gridCols4 gridGap1 mt2">
                {
                    checkExistanceInArray(userDataState.cartItems, product.id) ?
                    <button onClick={()=> addToCart(product)} className=" p1 bgGray5 border borderTeal3 gridColSpan3 md:gridColSpan3 textWhite rounded">
                        Go to Cart
                    </button>
                    : 
                    <button onClick={()=> addToCart(product)} className=" p1 bgTeal6 hover:bgTeal5 border borderTeal3 gridColSpan3 md:gridColSpan3 textWhite rounded">
                        Add to cart
                    </button>
                
                }
                <button onClick={() => addToWishlist(product)} className='displayFlex justifyCenter itemsCenter bgTransparent border borderTeal4 gridColSpan1 md:gridColSpan1 rounded p2'>
                    <i className={checkExistanceInArray(userDataState.wishlist, product.id) ? 'fas fa-heart textRed3 textRg': 'far fa-heart textRed3 textRg'}></i>
                </button>
            </div>
        </div>
    )
}
