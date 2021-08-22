import React, { useState, useReducer, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
// import logo from './logo.svg'
import './App.css'
import { getAllProducts } from './store/generate_products'
import TheNavbar from './components/TheNavbar'
import TheFooter from './components/TheFooter'
import ProductListing from './views/ProductListing'
import Cart from './views/Cart'
import Wishlist from './views/Wishlist'
import ProductPage from './views/ProductPage'
import NotFound from './views/NotFound'

// import reducer
import {StoreContext, actions, productReducer} from './reducers/productsReducer'
import {userDataContext, userActions, userDataReducer} from './reducers/userDataReducer'

function App() {
  const initialState = {
    productList: [],
    sort_price: 'none',
    productAppliedFilter: 'All'
    // show_all_products: true,
    // show_books: false,
    // show_flashcards: false,
    // show_toys: false,
  }
  const userData = {
    cartItems: [],
    cartTotal: 0,
    wishlist: []
  }

  
  const [state, dispatch] = useReducer(productReducer, initialState)
  const [userDataState, userDataDispatch] = useReducer(userDataReducer, userData)

  useEffect(() => {
    let isCancelled = false;

    // only call api if productlist is empty
    if(state.productList.length < 1){
      console.log('productlist is empty...', state.productList.length);
      // get all products
      (async function getInitialProducts(){
        try{
          let products = await getAllProducts()
          // console.log('app products: ', products)
          
          if(!isCancelled){
            dispatch({type: 'initialise_products', payload: products})
          }
        }
        catch(error){
          console.log('Error - initial request - ', error)
        }
      })()

      // cleanup function
      return () => {
        isCancelled = true;
      };
    }

  }, [])

  return (
    <StoreContext.Provider value={{dispatch, state}}>
      <userDataContext.Provider value={{userDataDispatch, userDataState}}>
        
        <main className="App textGray1">
          <TheNavbar ></TheNavbar>

          <div className='app-content containerMid pb4 flexGrow'>
            <Routes>
              <Route exact path="/" element={<ProductListing  /> }/>
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* {activeTab == 'ProductListing' && <ProductListing  changeTab = {handleTabChange} />}
            {activeTab == 'Cart' && <Cart changeTab = {handleTabChange} />}
            {activeTab == 'Wishlist' && <Wishlist changeTab = {handleTabChange} />} */}
          </div>

          {/* footer */}
          <TheFooter></TheFooter>
        </main>  
      </userDataContext.Provider>
    
    </StoreContext.Provider>
    
  )
}

export default App
