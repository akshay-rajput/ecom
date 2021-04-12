import React, {useContext} from 'react'
import {userDataContext} from '../reducers/userDataReducer'

export default function TheNavbar({changeTab, activeTab}) {
    // access state
    const store = useContext(userDataContext)
    const state = store.userDataState
    
    return (
        <header className=''>
            <nav className="app-navbar">
                <div className=" containerMid displayFlex justifyBetween itemsCenter pt2 pb2">
                    <a href="#" className="textTeal3 hover:textTeal5 fontSemiBold textMd p1 mr4">
                        Ecom
                    </a>
                    <ul className="displayFlex textRg">
                        <li className="listNoStyle">
                            <button onClick={()=> changeTab('ProductListing')} className={"bgTransparent borderNone textRg p2 textTeal4 hover:textTeal1" + (activeTab == 'ProductListing'? ' active': '')}>
                                <i className="fas fa-home textMd"></i>
                            </button>
                        </li>
                        <li className="listNoStyle ml2 mr2 md:mr8 md:ml8">
                            <button onClick={()=> changeTab('Cart')} className={"btn-cart bgTransparent borderNone textRg p2 textTeal4 hover:textTeal1" + (activeTab == 'Cart'? ' active': '')}>
                                <i className="fas fa-shopping-bag textMd"></i>
                                {
                                    state.cartItems.length > 0 && <span className="count">{state.cartItems.length}</span>
                                }
                            </button>
                        </li>
                        <li className="listNoStyle">
                            <button onClick={()=> changeTab('Wishlist')} className={"bgTransparent borderNone textRg p2 textTeal4 hover:textTeal1" + (activeTab == 'Wishlist'? ' active': '')}>
                                <i className="fas fa-heart textMd"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
