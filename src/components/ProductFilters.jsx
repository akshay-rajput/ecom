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
    function showGstFree(event){
        localDispatch(createAction(actions.SHOW_GSTFREE, event.target.checked))
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
                            <input onChange={showAll} defaultChecked={state.show_all_products} type="checkbox" className='mr1' name="outOfStock" id="outOfStock"/>
                            <label htmlFor="outOfStock">Out of stock</label>
                        </div>
                        <div className="displayFlex itemsCenter pt1 pb1">
                            <input onChange={showGstFree} defaultChecked={state.show_gstfree} type="checkbox" className='mr1' name="gstfree" id="gstfree"/>
                            <label htmlFor="gstfree">Tax free</label>
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
