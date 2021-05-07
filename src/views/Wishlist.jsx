import React, {useContext, useEffect} from 'react'
import nodata from '../assets/nodata.svg';
import { Link } from 'react-router-dom';
import {checkExistanceInArray} from '../store/checkExistanceInArray'
import {userActions, createUserAction, userDataContext} from '../reducers/userDataReducer'

export default function Wishlist() {
    // access state and dispatch
    const store = useContext(userDataContext)
    const state = store.userDataState
    const localDispatch = store.userDataDispatch

    function addToWishlist(item){
        if(!checkExistanceInArray(state.wishlist, item._id)){
            localDispatch(createUserAction(userActions.ADD_TO_WISHLIST, item))
        }
        else{
            localDispatch(createUserAction(userActions.REMOVE_FROM_WISHLIST, item))
        }
    }

    function moveToCart(product){
        // move to cart only if not already in cart
        if(!checkExistanceInArray(state.cartItems, product._id)){

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
            <div className="displayFlex justifyBetween itemsCenter">
                <h4 className='textLg fontMedium'>My Wishlist <span className='textMd textGray4'>({state.wishlist.length})</span></h4>
                <button onClick={() => history.back()} className="pl4 pr4 pt2 pb2 rounded bgGray5 textWhite borderNone">
                    <i className="fas fa-angle-left"></i> Back
                </button>
            </div>
            <hr className='border borderGray5 mt4 mb4'/>
            {
                state.wishlist.length > 0 &&
                <div className="displayGrid gridCols1 md:gridCols3 gridGap4 pt4 pb4">
                {
                    state.wishlist.map(product => {
                    return (
                        <div key={product._id} className='displayGrid gridCols3 border rounded p2'>
                            <div className='image-wrapper gridColSpan1'>
                                <img src={product.images} alt={product.name} className="wFull rounded"/>
                            </div>
                            
                            <div className="displayFlex flexCol gridColSpan2 pr2 pl4">
                                <div className="flexGrow displayFlex flexCol justifyBetween">
                                    <Link to={`/product/${product._id}`} className="textWhite hover:textTeal4 mb2">{product.name}</Link>
                            
                                    <div className="">
                                        <span className="mb2 displayBlock fontSemiBold">&#8377; {product.price}</span>
                                        <div className="textXs mb2 displayFlex flexWrap justifyBetween itemsCenter ">
                                            <span className="">Category: {product.category}</span>
                                            <span className="">Rating: {product.rating} / 5</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="product-actions displayGrid gridCols7 gridGap1 mt2">
                                    
                                    <button onClick={()=> moveToCart(product)} className="p1 bgTeal6 hover:bgTeal5 border borderTeal3 gridColSpan5 textWhite rounded">Move to Cart</button>
                                    
                                    <button onClick={() => addToWishlist(product)} className='bgTransparent border borderTeal4 gridColSpan2 rounded pt2 pb2'>
                                        <i className={checkExistanceInArray(state.wishlist, product._id) ? 'fas fa-heart textRed3 textRg': 'far fa-heart textRed3 textRg'}></i>
                                    </button>
                                </div>

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
                    <Link to="/" className='bgTeal2 hover:bgTeal4 textGray6 border borderTeal5 rounded pl4 pr4 pt2 pb2 mt8 mb8'>
                       <span className="ml1">View products</span>
                    </Link>
                </div>
            }

        </>
    )
}
