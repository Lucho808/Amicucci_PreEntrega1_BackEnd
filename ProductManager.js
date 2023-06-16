class Product {
  static lastId = 122;

  constructor(title, description, price, thumbnail, stock) {
    this.id = ++Product.lastId;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.stock = stock;
    this.code = this.generateCode();
  }

  generateCode() {
    return `abc${this.id}`;
  }
}

class ProductList {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, stock) {
    if (!title || !description || !price || !thumbnail || !stock) {
      console.log("Todos los campos son obligatorios");
      return;
    }

    const code = this.generateCode();
    const codeExists = this.products.some((product) => product.code === code);
    if (codeExists) {
      console.log(`Ya existe un producto con el código ${code}`);
      return;
    }

    const product = new Product(title, description, price, thumbnail, stock);
    this.products.push(product);
    console.log("Producto agregado:", product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.error("Not found");
      return null;
    }
  }

  generateCode() {
    const lastProduct = this.products[this.products.length - 1];
    if (lastProduct) {
      const lastId = lastProduct.id;
      return `abc${lastId + 1}`;
    } else {
      return "abc123";
    }
  }
}

const productList = new ProductList();
productList.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25);
/* productList.addProduct("Auto de carreras", "juguete", 2000, "https://picsum.photos/200/200/?random", 50);
productList.addProduct("Pelota de futbol", "deporte", 2000, "https://picsum.photos/200/200/?random", 50);
productList.addProduct("Camiseta", "ropa", 500, "https://picsum.photos/200/200/?random", 20); */

console.log("Lista de productos: ", productList.getProducts());

const product1 = productList.getProductById(123);
console.log("Producto con ID 1: ", product1);

const product2 = productList.getProductById(7);
console.log("Producto con ID 7: ", product2);
