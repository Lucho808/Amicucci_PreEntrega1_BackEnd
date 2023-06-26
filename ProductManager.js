const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProductsFromFile();
    product.id = this.getNextProductId(products);
    products.push(product);
    this.saveProductsToFile(products);
    console.log('Producto agregado: ', product);
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(id) {
    const products = this.getProductsFromFile();
    const product = products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.error('Producto no encontrado');
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updatedFields };
      this.saveProductsToFile(products);
      console.log('Producto actualizado: ', products[productIndex]);
    } else {
      console.error('Producto no encontrado');
    }
  }

  deleteProduct(id) {
    const products = this.getProductsFromFile();
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const deletedProduct = products.splice(productIndex, 1);
      this.saveProductsToFile(products);
      console.log('Producto eliminado: ', deletedProduct[0]);
    } else {
      console.error('Producto no encontrado');
    }
  }

  getProductsFromFile() {     //leer el JSON que contiene los productos y los devuelve como array de objetos
    try {
      const fileContent = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error('Error al leer el archivo: ', error);
      return [];
    }
  }

  saveProductsToFile(products) {  //guarda los productos en el JSON
    try {
      fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
      console.log('Productos guardados en el archivo:', this.path);
    } catch (error) {
      console.error('Error al guardar los productos: ', error);
    }
  }

  getNextProductId(products) {
    const lastProductId = products.length > 0 ? products[products.length - 1].id : 0;
    return lastProductId + 1;
  }
}

// Uso de la clase ProductManager
const productManager = new ProductManager('productos.json');

const prueba1 = {
  title: 'producto prueba1',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  stock: 25
};

const prueba2 = {
  title: 'producto prueba2',
  description: 'Este es otro producto prueba',
  price: 200,
  thumbnail: 'Sin imagen',
  stock: 25
};

productManager.addProduct(prueba1);
productManager.addProduct(prueba2);

productManager.deleteProduct(2);


console.log('Lista de productos: ', productManager.getProducts());

const product1 = productManager.getProductById(1);
console.log('Producto con ID 1: ', product1);

const product2 = productManager.getProductById(2);
console.log('Producto con ID 2: ', product2);

console.log('Lista de productos después de eliminar: ', productManager.getProducts());
