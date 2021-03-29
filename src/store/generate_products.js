import faker from 'faker';

faker.seed(777);

const products = [];

function generateProducts(){
    for (let index = 0; index < 20; index++) {
        const productData = {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            image: faker.image.abstract(),
            price: faker.commerce.price(),
            material: faker.commerce.productMaterial(),
            inStock: faker.datatype.boolean(),
            gst: faker.random.arrayElement([
                'None','9%','12%'
            ])
        }

        products.push(productData);
    }
}
generateProducts();

export default products;
