const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('productos.json');
const port = 8080;

app.get('/products', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = productManager.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
