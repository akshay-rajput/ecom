import React, {useContext} from 'react'
// state
import {actions, createAction, StoreContext} from '../reducers/productsReducer'

export default function ProductFilters({activeOption, isSidebarFilterSupported}) {
    
    // access state and dispatch
    const store = useContext(StoreContext)
    const state = store.state
    const localDispatch = store.dispatch

    function showAll(event){
        localDispatch(createAction(actions.SHOW_ALL_PRODUCTS, event.target.checked))
    }
    function showBooks(event){
        localDispatch(createAction(actions.SHOW_BOOKS, event.target.checked))
    }
    function showFlashcards(event){
        localDispatch(createAction(actions.SHOW_FLASHCARDS, event.target.checked))
    }
    function showToys(event){
        localDispatch(createAction(actions.SHOW_TOYS, event.target.checked))
    }
    function sortPrice(option){
        localDispatch(createAction(actions.SORT_PRICE, option))
    }
    

    return (
        <div className="filter-sticky">
            {   
                (activeOption == 'Filter' || isSidebarFilterSupported == true) && 
                <div className="filter-section">
                    { isSidebarFilterSupported?'Filters':''}
                    <div className="actions displayFlex flexCol mt2 mb2">
                        <div className="displayFlex itemsCenter pt1 pb1">
                            <input onChange={showAll} defaultChecked={state.productAppliedFilter == 'All'} type="radio" className='mr1' name="product_filter" id="all"/>
                            <label htmlFor="all">All Products</label>
                        </div>
                        <div className="displayFlex itemsCenter pt1 pb1">
                            <input onChange={showBooks} defaultChecked={state.productAppliedFilter == 'Books'} type="radio" className='mr1' name="product_filter" id="books"/>
                            <label htmlFor="books">Books</label>
                        </div>
                        <div className="displayFlex itemsCenter pt1 pb1">
                            <input onChange={showFlashcards} defaultChecked={state.productAppliedFilter == "Flashcards"} type="radio" className='mr1' name="product_filter" id="flashcards"/>
                            <label htmlFor="flashcards">Flash cards</label>
                        </div>
                        <div className="displayFlex itemsCenter pt1 pb1">
                            <input onChange={showToys} defaultChecked={state.productAppliedFilter == 'Toys'} type="radio" className='mr1' name="product_filter" id="toys"/>
                            <label htmlFor="toys">Toys & Games</label>
                        </div>
                        
                    </div>
                </div>
            }
            {
                activeOption == 'Sort' && 
                <div className="sort-section">
                    {/* Sort by */}
                    <div className="actions displayFlex flexCol mb2">
                        <ul className="">
                            <li onClick={() => sortPrice('low')} className="cursorPointer hover:textTeal4 pt1 pb1">Price - Low to High</li>
                            <li onClick={() => sortPrice('high')} className="cursorPointer hover:textTeal4 pt1 pb1">Price - High to Low</li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    )
}
