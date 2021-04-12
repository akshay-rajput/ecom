import React, {useContext, useEffect} from 'react'
import nodata from '../assets/nodata.svg'
import {checkExistanceInArray} from '../store/checkExistanceInArray'
import {userActions, createUserAction, userDataContext} from '../reducers/userDataReducer'

export default function Wishlist({changeTab}) {
    // access state and dispatch
    const store = useContext(userDataContext)
    const state = store.userDataState
    const localDispatch = store.userDataDispatch

    function addToWishlist(item){
        if(!checkExistanceInArray(state.wishlist, item.id)){
            localDispatch(createUserAction(userActions.ADD_TO_WISHLIST, item))
        }
        else{
            localDispatch(createUserAction(userActions.REMOVE_FROM_WISHLIST, item))
        }
    }

    function moveToCart(product){
        // move to cart only if not already in cart
        if(!checkExistanceInArray(state.cartItems, product.id)){

            product.qty = 1;
            // move product to cart
            localDispatch(createUserAction(userActions.ADD_TO_CART, product))

            localDispatch(createUserAction(userActions.FIND_CARTTOTAL))

            // remove from wishlist as well
            localDispatch(createUserAction(userActions.REMOVE_FROM_WISHLIST, product))
        }
        else{
            // remove from wishlist as well
            localDispatch(createUserAction(userActions.REMOVE_FROM_WISHLIST, product))
        }
    }

    return (
        <>
            <h4 className='textLg fontMedium'>My Wishlist <span className='textMd textGray4'>({state.wishlist.length})</span></h4>
            <hr className='border borderGray5 mt4 mb4'/>
            {
                state.wishlist.length > 0 &&
                <div className="displayGrid gridCols2 md:gridCols5 gridGap4 pt4 pb4">
                {
                    state.wishlist.map(product => {
                    return (
                        <div key={product.id} className='displayFlex flexCol border rounded p2'>
                            <label className='textSm mb2'>{product.name}</label>
                            <div className='image-wrapper flexGrow'>
                                <img src={product.image} alt={product.name} className="wFull rounded mb2"/>
                            </div>
                            <span className="mb2 fontSemiBold">$ {product.price}</span>
                            <div className="textXs mb2 displayFlex flexWrap justifyBetween itemsCenter ">
                                <span className="">GST: {product.gst}</span>
                                <span className="">{product.inStock ? 'In stock': 'Out of stock'}</span>
                            </div>
                            <div className="product-actions displayGrid gridCols7 gridGap1 mt2">
                                
                                <button onClick={()=> moveToCart(product)} className="p1 bgTeal6 hover:bgTeal5 border borderTeal3 gridColSpan5 md:gridColSpan6 textWhite rounded">Move to Cart</button>
                                
                                <button onClick={() => addToWishlist(product)} className='bgTransparent border borderTeal4 gridColSpan2 md:gridColSpan1 rounded p2'>
                                    <i className={checkExistanceInArray(state.wishlist, product.id) ? 'fas fa-heart textRed3 textRg': 'far fa-heart textRed3 textRg'}></i>
                                </button>
                            </div>
                        </div>
                    )
                    })
                }
                </div>    
            }
            {
                state.wishlist.length < 1 && 
                <div className="displayFlex flexCol textCenter itemsCenter">
                    <img src={nodata} style={{width: '150px', margin: 'auto'}} className='pt8 pb4' alt="Wishlist is empty"/>
                    <span className="textGray4 pt4">
                        Looks like your wishlist is empty! <br/> Go to product listing to add items to wishlist
                    </span>
                    <button onClick={() => changeTab('ProductListing')} className='bgTeal2 hover:bgTeal4 textGray6 border borderTeal5 rounded pl4 pr4 pt2 pb2 mt8 mb8'>
                       <span className="ml1">View products</span>
                    </button>
                </div>
            }

        </>
    )
}
