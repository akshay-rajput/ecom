import axios from 'axios'

let products = []

function fetchProducts(){
    return axios.get('https://shop-wisp.herokuapp.com/products');
}

async function getAllProducts(){
    try{
        console.count('call product API...')
        const response = await fetchProducts()
        console.log('response: ', response)
        products = response.data.products

        return products
    }
    catch(error){
        console.log(error);
    }
}

// setProducts()

export {getAllProducts, products};

// import faker from 'faker';

// faker.seed(10);

// const products = [];

// function generateProducts(){
//     for (let index = 0; index < 20; index++) {
//         const productData = {
//             id: faker.datatype.uuid(),
//             name: faker.commerce.productName(),
//             image: faker.random.image(),
//             price: faker.commerce.price(),
//             material: faker.commerce.productMaterial(),
//             inStock: faker.datatype.boolean(),
//             gst: faker.random.arrayElement([
//                 'None','9%','12%'
//             ])
//         }

//         products.push(productData);
//     }
// }
// generateProducts();

// export default products;
