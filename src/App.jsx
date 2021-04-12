import React, { useState, useReducer, useEffect } from 'react'
// import logo from './logo.svg'
import './App.css'
import products from './store/generate_products'
import TheNavbar from './components/TheNavbar'
import TheFooter from './components/TheFooter'
import ProductListing from './components/ProductListing'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'

// import reducer
import {StoreContext, actions, productReducer} from './reducers/productsReducer'
import {userDataContext, userActions, userDataReducer} from './reducers/userDataReducer'

function App() {
  const initialState = {
    productList: [...products],
    sort_price: 'none',
    show_all_products: true,
    show_gstfree: false
  }
  const userData = {
    cartItems: [],
    cartTotal: 0,
    wishlist: []
  }

  // const [listOfProducts, setListOfProducts] = useState([])
  const [activeTab, setActiveTab] = useState('ProductListing');

  const [state, dispatch] = useReducer(productReducer, initialState)
  const [userDataState, userDataDispatch] = useReducer(userDataReducer, userData)


  function handleTabChange(tabname){
    setActiveTab(tabname);
  }

  return (
    <StoreContext.Provider value={{dispatch, state}}>
      <userDataContext.Provider value={{userDataDispatch, userDataState}}>
        
        <main className="App textGray1">
          <TheNavbar changeTab = {handleTabChange} activeTab={activeTab} ></TheNavbar>

          <div className='app-content containerMid pb4 flexGrow'>
            {activeTab == 'ProductListing' && <ProductListing  changeTab = {handleTabChange} />}
            {activeTab == 'Cart' && <Cart changeTab = {handleTabChange} />}
            {activeTab == 'Wishlist' && <Wishlist changeTab = {handleTabChange} />}
          </div>

          {/* footer */}
          <TheFooter></TheFooter>
        </main>  
      </userDataContext.Provider>
    
    </StoreContext.Provider>
    
  )
}

export default App
