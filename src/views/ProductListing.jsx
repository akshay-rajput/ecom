import React, {useContext, useEffect, useState} from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'

// state
import {actions, createAction, StoreContext} from '../reducers/productsReducer'

export default function ProductListing({changeTab}) {

    const [activeProductListOption, setactiveProductListOption] = useState('')
    const [isSidebarFilterSupported, setisSidebarFilterSupported] = useState(true)

    function applyProductListOption(option){
        setactiveProductListOption(option);
        console.log('active option: ', activeProductListOption)
    }

    // access state and dispatch
    const store = useContext(StoreContext)
    const state = store.state
    const localDispatch = store.dispatch


    useEffect(() => {
        console.log('window: ', window.innerWidth)
        if (window.innerWidth >= 768){
            setisSidebarFilterSupported(true)
       }
       else{
           setisSidebarFilterSupported(false)
       }
    }, [])
    
    
    function sortPrice(event){
        localDispatch(createAction(actions.SORT_PRICE, event.target.value))
    }
    function generateProductList(){
        let productList = state.productList;
        let sortby = state.sort_price;

        if (sortby) {
            productList = state.productList.sort((a, b) =>
                sortby === 'high' ? b.price - a.price : a.price - b.price
            );
        }

        let filteredProducts = productList;

        if(state.productAppliedFilter == 'All'){
            return filteredProducts
        }
        else if(state.productAppliedFilter == "Books"){
            return filteredProducts.filter((product) => product.category =='Books');
        }
        else if(state.productAppliedFilter == "Flashcards"){
            return filteredProducts.filter((product) => product.category =='Flash Cards');
        }
        else if(state.productAppliedFilter == "Toys"){
            return filteredProducts.filter((product) => product.category =='Toys & Games');
        }
        
    }

    return (
        <div className='productListing-container'>
            <div className="">
                <h4 className="textMd fontSemiBold">
                    Products <span className="textSm textGray4">( {generateProductList().length} )</span>
                </h4>
            </div>

            <div className="sort-options pt4 pb4 hiddenMobile displayFlex itemsCenter" style={{justifyContent: 'flex-end'}}>
                <label htmlFor="sort_option"className=' textSm textGray3'>Sort by</label>
                <select name="sort_option" defaultValue='low' id="sort_option" onChange={sortPrice} className='p1 ml1 rounded'>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                </select>
            </div>

            <div className="displayFlex gridGap4" style={{alignItems: 'stretch'}}>
                {/* filters */}
                <div className="filter-div">
                    <ProductFilters isSidebarFilterSupported={isSidebarFilterSupported} activeOption={activeProductListOption}></ProductFilters>
                    
                    {/* toggle on mobile devices */}
                    {   !isSidebarFilterSupported && 
                        <div className="displayGrid gridCols2">
                            <button onClick={()=> applyProductListOption('Filter')} 
                                className={' textTeal3 borderNone hover:bgGray5 ' + (activeProductListOption == 'Filter'? 'active': '')}>
                                
                                <i className="fas fa-filter"></i> 
                                <span className="fontMedium textRg ml1">Filters</span>
                            </button>
                            <button onClick={()=> applyProductListOption('Sort')} 
                                className={'bgTransparent borderNone textTeal3 hover:bgGray5 ' + (activeProductListOption == 'Sort'? 'active': '')}>
                                
                                <i className="fas fa-sort-amount-up"></i> 
                                <span className="fontMedium textRg ml1">Sort</span>
                            </button>
                        </div>
                    }

                    {/* show close button only if filter or sort selected */}
                    {
                        activeProductListOption != '' && 
                        <i onClick={()=> applyProductListOption('')} 
                        className="btn-close-options fas fa-times pl2 pr2 pt1 pb1 roundedFull bgGray6 textTeal2 textMd cursorPointer hover:bgTeal6"></i>
                    }
                </div>

                {/* if products available */}
                {   
                    generateProductList().length > 0 &&
                    <div className="productlist displayGrid gridCols2 md:gridCols3 gridGap8 pt4 pb4">
                    {   
                        generateProductList().map(product => {
                        return (
                            <ProductCard key={product._id} product={product} changeTab={changeTab}></ProductCard>
                        )
                        })
                    }
                    </div>    
                }
            </div>
            {
                generateProductList().length < 1 && 
                <div className="">
                    There are no products available here..
                </div>
            }
        </div>
    )
}
