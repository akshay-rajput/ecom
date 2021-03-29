import React from 'react'

export default function ProductListing({listOfProducts}) {
    return (
        <>
            <div className="displayFlex flexWrap justifyBetween itemsCenter mb4">
                <h4 className="textMd fontSemiBold">
                    Products <span className="textSm textGray4">( {listOfProducts.length} )</span>
                </h4>
                <div className="actions displayFlex flexWrap mt2 mb2">
                    <div className="displayFlex itemsCenter mr6">
                        <input type="checkbox" className='mr1' name="outOfStock" id="outOfStock"/>
                        <label htmlFor="outOfStock">Out of stock</label>
                    </div>
                    <div className="sort-options displayFlex">
                        <div className="displayFlex itemsCenter mr4">
                            <input type="radio" className='mr1 mt1' name="sortProducts" id="sortLow"/>
                            <label htmlFor="sortLow">Low to High</label>
                        </div>
                        <div className="displayFlex itemsCenter">
                            <input type="radio" className='mr1 mt1' name="sortProducts" id="sortHigh"/>
                            <label htmlFor="sortHigh">High to Low</label>
                        </div>
                    </div>
                </div>
            </div>
            {/* if products available */}
            {   
                listOfProducts.length > 0 &&
                <div className="displayGrid gridCols2 md:gridCols4 gridGap4 pt4 pb4">
                {
                    listOfProducts.map(product => {
                    return (
                        <div key={product.id} className='displayFlex flexCol border rounded p2'>
                            <label className='textSm mb2'>{product.name}</label>
                            <div className='image-wrapper flexGrow'>
                                <img src={product.image} alt={product.name} className="wFull rounded mb2"/>
                            </div>
                            <span className="mb2 fontSemiBold">$ {product.price}</span>
                            <div className="textXs mb2 displayFlex flexWrap justifyBetween itemsCenter ">
                                <span className="">GST: {product.gst}</span>
                                <span className="">{product.inStock ? 'In stock': 'Out of stock'}</span>
                            </div>
                        </div>
                    )
                    })
                }
                </div>    
            }
            {
                listOfProducts.length < 1 && 
                <div className="">
                    There are no products available here..
                </div>
            }
        </>
    )
}
