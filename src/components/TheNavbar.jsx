import React from 'react'

export default function TheNavbar({changeTab}) {
    return (
        <header className=''>
            <nav className="containerMid displayFlex justifyBetween itemsCenter pt2 pb2">
                <a href="#" className="textTeal3 hover:textTeal5 fontSemiBold textMd p1 mr4">
                    Ecom
                </a>
                <ul className="displayFlex textRg">
                    <li className="listNoStyle">
                        <button onClick={()=> changeTab('ProductListing')} className="bgTransparent borderNone textRg p2 textTeal4 hover:textTeal1">Home</button>
                    </li>
                    <li className="listNoStyle ml2 mr2 md:mr8 md:ml8">
                        <button onClick={()=> changeTab('Cart')} className="bgTransparent borderNone textRg p2 textTeal4 hover:textTeal1">Cart</button>
                    </li>
                    <li className="listNoStyle">
                        <button onClick={()=> changeTab('Wishlist')} className="bgTransparent borderNone textRg p2 textTeal4 hover:textTeal1">Wishlist</button>
                    </li>
                </ul>
            
            </nav>
        </header>
    )
}
