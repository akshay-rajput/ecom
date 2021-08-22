import React, {useContext, useState, useEffect} from 'react'
import emptycart from '../assets/empty.svg';
import { Link } from 'react-router-dom';
import {checkExistanceInArray} from '../store/checkExistanceInArray'
import {userActions, createUserAction, userDataContext} from '../reducers/userDataReducer';
import Spinner from '../components/Spinner';
import displayRazorpay from '../paymentGateway';

export default function Cart({changeTab}) {
    // access state and dispatch
    const store = useContext(userDataContext)
    const state = store.userDataState
    const localDispatch = store.userDataDispatch
    
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    // useEffect(() => {
    //     console.log('useEffect --> state cart: ', state.cartItems)
    // }, [])

    function addToWishlist(item){
        if(checkExistanceInArray(state.wishlist, item._id)){
            localDispatch(createUserAction(userActions.REMOVE_FROM_WISHLIST, item))
            // console.log('removing from wishlist..')
        }
        else{
            localDispatch(createUserAction(userActions.ADD_TO_WISHLIST, item))
            // console.log("adding to wishlist...");
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

    async function initCheckout(){
        setIsCheckingOut(true);

        let checkoutData = {
            items: [],
            total: 0
        };
        // console.log('initiate checkout..', state.cartItems);
        state.cartItems.forEach((item) => {
            let itemdata = {}
            itemdata.name = item.name;
            itemdata.price = item.price;
            itemdata.quantity = item.qty;

            checkoutData.items.push(itemdata);
        });

        checkoutData.total = state.cartTotal;
        // console.log('chekoutd: ', checkoutData);

        await displayRazorpay(checkoutData);

        setIsCheckingOut(false);
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
                                <div key={product._id} className='displayGrid gridCols12 border borderTeal5 rounded mb2'>
                                    <div className='cart-item-imagewrapper gridColSpan3 displayFlex justifyCenter itemsCenter'>
                                        <img src={product.images} alt={product.name} className="cart-item-image rounded"/>
                                    </div>
                                    <div className="product-details gridColSpan9 displayFlex flexCol p2">
                                        <div className="product-info flexGrow">
                                            <div className="displayFlex mb2 justifyBetween itemsCenter flexWrap">
                                                {/* <label className='mb1'>{product.name}</label> */}
                                                <Link to={`/product/${product._id}`} className="textWhite hover:textTeal4 mb2">{product.name}</Link>
                                                <span className="mb1 textSm fontSemiBold">$ {product.price}</span>
                                            </div>

                                            <div className="textXs mt2 mb2 displayFlex flexWrap itemsCenter ">
                                                <span className="mr4">Category: {product.category}</span>
                                                <span className="">Rating: {product.rating} / 5</span>
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
                                                <i className={checkExistanceInArray(state.wishlist, product._id) ? 'fas fa-heart textRed3 textRg': 'far fa-heart textRed3 textRg'}></i>
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
                                            <div key={item._id} className="cart-item displayGrid gridCols12 mb3">
                                                <span className="gridColSpan6">{item.name}</span>
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
                        
                        <button onClick={()=> initCheckout()} 
                                className="pt2 pb2 displayBlock wFull rounded textRg fontSemiBold textTeal1 bgTeal6 hover:bgTeal5 mt1">
                                Checkout &nbsp;
                                {
                                    isCheckingOut &&
                                    <Spinner />
                                }
                        </button>

                        <small className="textXs textGray3 mt2 lineHeightSm displayBlock">
                            Use credit card as mode of payment and (4111 1111 1111 1111) as card number.
                        </small>
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
                    <Link to="/" className='bgTeal2 hover:bgTeal4 textGray6 border borderTeal5 rounded pl4 pr4 pt2 pb2 mt8 mb8'>
                       <i className="fas fa-plus textXs"></i>
                       <span className="ml1 fontMedium">Add products</span>
                    </Link>
                </div>
            }

        </>
    )
}
