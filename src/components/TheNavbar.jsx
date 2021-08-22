import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom';
import {userDataContext} from '../reducers/userDataReducer'


export default function TheNavbar({changeTab, activeTab}) {
    // access state
    const store = useContext(userDataContext)
    const state = store.userDataState
    
    return (
        <header className=''>
            <nav className="app-navbar">
                <div className=" containerMid displayFlex justifyBetween itemsCenter pt2 pb2">
                    
                    <NavLink end activeClassName="active-link" to="/" className="textTeal3 hover:textTeal5 fontSemiBold textMd p1 mr4">Wisp</NavLink>
                    
                    <ul className="displayFlex textRg">
                        <NavLink end to="/" activeClassName="active-link" className={"bgTransparent borderNone textRg p2 textTeal4 hover:textTeal1"}>
                            <i className="fas fa-home textMd"></i>
                        </NavLink>

                        <NavLink to="/cart" activeClassName="active-link" className={"btn-cart bgTransparent borderNone textRg p2 ml2 mr2 textTeal4 hover:textTeal1"}>
                            <i className="fas fa-shopping-bag textMd"></i>
                            {
                                state.cartItems.length > 0 && <span className="count">{state.cartItems.length}</span>
                            }
                        </NavLink>
                        
                        <NavLink to="/wishlist" activeClassName="active-link" className={"bgTransparent borderNone textRg p2 textTeal4 hover:textTeal1"}>
                            <i className="fas fa-heart textMd"></i>
                        </NavLink>
                        
                    </ul>
                </div>
            </nav>
        </header>
    )
}
