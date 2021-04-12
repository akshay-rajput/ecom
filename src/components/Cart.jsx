import React, {useContext, useEffect} from 'react'
import emptycart from '../assets/empty.svg'
import {checkExistanceInArray} from '../store/checkExistanceInArray'
import {userActions, createUserAction, userDataContext} from '../reducers/userDataReducer'

export default function Cart({changeTab}) {
    // access state and dispatch
    const store = useContext(userDataContext)
    const state = store.userDataState
    const localDispatch = store.userDataDispatch
    
    useEffect(() => {
        console.log('useEffect --> state cart: ', state.cartItems)
    }, [])

    function addToWishlist(item){
        if(checkExistanceInArray(state.wishlist, item.id)){
            localDispatch(createUserAction(userActions.REMOVE_FROM_WISHLIST, item))
            console.log('removing from wishlist..')
        }
        else{
            localDispatch(createUserAction(userActions.ADD_TO_WISHLIST, item))
            console.log("adding to wishlist...");
        }
    }

    function removeFromCart(product){
        localDispatch(createUserAction(userActions.REMOVE_FROM_CART, product))
        localDispatch(createUserAction(userActions.FIND_CARTTOTAL))
    }
    function increaseQuantity(product){
        localDispatch(createUserAction(userActions.INC_QTY, product))
        localDispatch(createUserAction(userActions.FIND_CARTTOTAL))
    }
    function decreaseQuantity(product){
        if(product.qty <= 1){
            localDispatch(createUserAction(userActions.REMOVE_FROM_CART, product))
            localDispatch(createUserAction(userActions.FIND_CARTTOTAL))
        }else{
            localDispatch(createUserAction(userActions.DEC_QTY, product))
            localDispatch(createUserAction(userActions.FIND_CARTTOTAL))
        }
    }

    return (
        <>
            <h4 className='textLg fontMedium'>My Cart <span className='textMd textGray4'>({state.cartItems.length})</span></h4>
            <hr className='border borderGray5 mt4 mb4'/>
            {
                state.cartItems.length > 0 &&
                <div className="cart-grid displayGrid gridCols12">
                    {/* show cart items */}
                    <div className="gridColSpan12 md:gridColSpan8 pt4 pb4">
                        {
                            state.cartItems.map(product => {
                            return (
                                <div key={product.id} className='displayGrid gridCols12 border borderTeal5 rounded mb2'>
                                    <div className='image-wrapper gridColSpan3'>
                                        <img src={product.image} alt={product.name} className="wFull rounded mb2"/>
                                    </div>
                                    <div className="product-details gridColSpan9 displayFlex flexCol p2">
                                        <div className="product-info flexGrow">
                                            <div className="displayFlex mb2 justifyBetween itemsCenter flexWrap">
                                                <label className='mb1'>{product.name}</label>
                                                <span className="mb1 textSm fontSemiBold">$ {product.price}</span>
                                            </div>

                                            <div className="textXs mt2 mb2 displayFlex flexWrap itemsCenter ">
                                                <span className="mr4">GST: {product.gst}</span>
                                                <span className="">{product.inStock ? 'In stock': 'Out of stock'}</span>
                                            </div>

                                        </div>
                                        <div className="cartItem-actions itemsCenter justifyBetween pb1 pt1">
                                            <button onClick={() => decreaseQuantity(product)} className='bgTransparent borderNone p1'>
                                                <i className='fas fa-minus textTeal3 hover:textTeal5 p1'></i>
                                            </button>
                                            
                                            <span className="item-quantity textSm pb1 fontSemiBold">{product.qty}</span>

                                            <button onClick={() => increaseQuantity(product)} className='bgTransparent borderNone p1' title='Remove from cart'>
                                                <i className=' fas fa-plus textTeal3 hover:textTeal5 p1 '></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* last row */}
                                    <hr className='gridColSpan12 border borderTeal6'/>
                                    
                                    <div className="gridColSpan12 displayGrid gridCols12 gridGap2">
                                        <div className="cartItem-actions gridColSpan3 displayFlex itemsCenter pb1 pt1">
                                            <button onClick={() => removeFromCart(product)} className='bgTransparent borderNone p2 mr2' title='Remove from cart'>
                                                <i className={'far fa-trash-alt textRed3 textRg hover:textGray1'}></i>
                                            </button>
                                            
                                            <button onClick={() => addToWishlist(product)} className='bgTransparent borderNone p2'>
                                                <i className={checkExistanceInArray(state.wishlist, product.id) ? 'fas fa-heart textRed3 textRg': 'far fa-heart textRed3 textRg'}></i>
                                            </button>
                                        </div>

                                        <div className="gridColSpan9 textRight">
                                            
                                            <div className="pt2 pb2 pl2 pr4">
                                                <span className="textSm mr2">Total </span>
                                                <span className="fontSemiBold">$ {product.price * product.qty}</span>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            )
                            })
                        }
                    </div>
                    <div className="gridColSpan12 md:gridColSpan4 mt4 md:ml4">
                        <div className="p4 border borderTeal5 rounded">
                            <h4 className="textRg fontMedium textGray3">Order summary</h4>
                            <hr className='border borderGray5 mb4 mt4'/>
                            <div className='cart-items'>
                                {
                                    state.cartItems.map(item => {
                                        return(
                                            <div key={item.id} className="cart-item displayGrid gridCols12 mb3">
                                                <span className="gridColSpan6">{item.name} 3</span>
                                                <span className="gridColSpan3 textRight"> x {item.qty}</span>
                                                <span className="gridColSpan3 textRight">$ {item.price * item.qty}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <hr className='border borderTeal6 mt4 mb2'/>
                            <div className="cart-total displayFlex justifyBetween itemsCenter">
                                <span className="textMd">Total</span>
                                <span className=" textMd">$ {state.cartTotal}</span>
                            </div>
                        </div>
                        
                    </div>
                </div>
                    
            }
            {
                state.cartItems.length < 1 && 
                <div className="displayFlex flexCol itemsCenter">
                    <img src={emptycart} style={{width: '250px', margin: 'auto'}} className='pt8 pb4' alt="Cart is empty"/>
                    <span className="textGray4 pt4">
                        Looks like your cart is empty!
                    </span>
                    <button onClick={() => changeTab('ProductListing')} className='bgTeal2 hover:bgTeal4 textGray6 border borderTeal5 rounded pl4 pr4 pt2 pb2 mt8 mb8'>
                       <i className="fas fa-plus textXs"></i>
                       <span className="ml1 fontMedium">Add products</span>
                    </button>
                </div>
            }

        </>
    )
}
