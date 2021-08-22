import React, {useContext} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
// import { useHistory } from "react-router-dom";
import {checkExistanceInArray} from '../store/checkExistanceInArray'
import {userActions, createUserAction, userDataContext} from '../reducers/userDataReducer'

export default function ProductDetailCard({productData}) {
    // let history = useHistory();

    // similar to product from listing
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
        <div className="displayGrid gridCols12 gridGap4">
            <div className="btn-back gridColSpan12">
                <button onClick={() => history.back()} className="pl4 pr4 pt2 pb2 rounded bgGray5 textWhite borderNone">
                    <i className="fas fa-angle-left"></i> Back
                </button>
            </div>

            <div className="product-image gridColSpan12 md:gridColSpan4 p2 md:p8">
                <img src={productData.images} className='wFull' alt="product image"/>
            </div>
            <div className="product-info gridColSpan12 md:gridColSpan6 p2 md:pt8">
                <h3 className="textMd md:textLg fontNormal mb2 md:mb4">{productData.name}</h3>
                
                <h5 className="textRg fontNormal">Category: {productData.category}</h5>
                
                {/* description */}
                <div className="textSm textGray3">
                    {
                        productData.description !== "" && 
                        <p className="mt4 mb4">
                            <span className="fontSemiBold underline pr2">Description</span>{productData.description}
                        </p>
                    }
                </div>

                {/* price */}
                <div className="displayFlex flexWrap itemsCenter justifyBetween">
                    <div className="displayFlex flexCol">
                        <small className="textGray3">Price</small> 
                        <span className="textGray2 fontBold md:textLg">&#8377; {productData.price}</span>
                    </div>

                    <div className="displayFlex flexCol">
                        <small className="textGray3">Rating</small> 
                        <span className="textGray2 md:textLg">{productData.rating} / 5</span>
                    </div>

                    <div className="product-actions displayFlex gridGap4 mt2">
                        {
                            checkExistanceInArray(userDataState.cartItems, productData._id) ?
                            <Link to='/cart' className="textCenter md:textRg pt2 pb2 pl4 pr4 bgGray5 border borderTeal3 gridColSpan3 md:gridColSpan3 textWhite rounded">
                                Go to Cart
                            </Link>
                            : 
                            <button onClick={()=> addToCart(productData)} className=" md:textRg pt2 pb2 pl4 pr4 bgTeal6 hover:bgTeal5 border borderTeal3 textWhite rounded">
                                Add to cart
                            </button>
                        }
                        
                        <button onClick={() => addToWishlist(productData)} className='displayFlex justifyCenter itemsCenter bgTransparent border borderTeal4 rounded p2'>
                            <i className={checkExistanceInArray(userDataState.wishlist, productData._id) ? 'fas fa-heart textRed3 textRg': 'far fa-heart textRed3 textRg'}></i>
                        </button>
                    </div>
                </div>

                {/* specs */}
                {
                    productData.specs.length > 0 && 
                    <div className="mt4 mb4 md:mt8 md:mb8">
                        <h4 className="textRg fontNormal textGray4 mb2">Specifications</h4>
                        
                        <div className="displayGrid gridCols2 gridGap2">
                        {
                            productData.specs.map(spec => {
                                return (
                                    <span key={spec} className="gridColSpan2 md:gridColSpan1 mb1 textGray3">
                                        {spec}
                                    </span>
                                )
                            })
                        }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
