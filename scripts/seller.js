// script/seller.js
import { initializeData, getProducts, addProduct, updateProduct, deleteProduct } from './utils.js';


const renderProducts = () => {
    const products = getProducts();
    const tableBody = document.getElementById('products-table-body');
    tableBody.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>

            <td><img src="${product.image}" width="50" height="50"></td>
            <td>
                <button onclick="deleteProductHandler('${product.id}')">Delete</button>
                <button('${product.id}')">Update</button>
                
                </tr>
    `).join('');
};


const deleteProductHandler = (id) => {
    deleteProduct(id);
    renderProducts();
};


document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);

    const image = document.getElementById('image').files[0];
   

  

    if (image) {
       
        const imageUrl = URL.createObjectURL(image);
        addProduct({ name, price, stock, image:imageUrl});
    } else {
        addProduct({ name, price, stock });
    

    }
    renderProducts();
   
   
    document.getElementById('product-form').reset(); 
 

    // const img = document.getElementById('img').src;
    addProduct({ name, price, stock });
    renderProducts();

});

window.deleteProductHandler = deleteProductHandler;

document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    renderProducts();
});




const arr=JSON.parse(localStorage.getItem('products'));
console.log(arr);

// const arr=JSON.parse(localStorage.getItem('products'));
// console.log(arr);

