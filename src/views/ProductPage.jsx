import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import ProductDetailCard from '../components/ProductDetailCard'
import axios from 'axios'

export default function ProductPage() {
    let {productId} = useParams();
    const [productData, setproductData] = useState({})

    useEffect(() => {
        // let productId = useParams()
        console.log('pid: ', productId)
        
        async function getProduct() {
            try{
                console.log('getting product data')
                const response = await axios.get(`https://shop-wisp.herokuapp.com/products/${productId}`);
                setproductData(response.data.product)
            }
            catch(err){
                console.log(err)
            }
        }

        getProduct()
    }, [])

    return (
        <div>
            {
                productData.name && 
                <ProductDetailCard productData={productData} />
            }
        </div>
    )
}
