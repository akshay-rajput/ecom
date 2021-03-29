import React, { useState, useEffect } from 'react'
// import logo from './logo.svg'
import './App.css'
import products from './store/generate_products'
import TheNavbar from './components/TheNavbar'
import TheFooter from './components/TheFooter'
import ProductListing from './components/ProductListing'
import Cart from './components/Cart'
import Wishlist from './components/Wishlist'

function App() {
  const [listOfProducts, setListOfProducts] = useState([])
  const [activeTab, setActiveTab] = useState('ProductListing');

  useEffect(()=> {
    setListOfProducts(prevList => ( [...prevList] , products ))
    console.log('generating..', products.length)
    console.log('list: ', listOfProducts);
  }, [])

  function handleTabChange(tabname){
    setActiveTab(tabname);
  }

  return (
    <main className="App textGray1">
      <TheNavbar changeTab = {handleTabChange} ></TheNavbar>

      <div className='app-content containerMid pt4 pb4 flexGrow'>
        {activeTab == 'ProductListing' && <ProductListing listOfProducts={listOfProducts} />}
        {activeTab == 'Cart' && <Cart />}
        {activeTab == 'Wishlist' && <Wishlist />}
      </div>

      {/* footer */}
      <TheFooter></TheFooter>
    </main>
  )
}

export default App
