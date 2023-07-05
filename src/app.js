const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager('productos.json');
const port = 8080;

app.get('/products', async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = limit ? (await productManager.getProducts()).slice(0, limit) : await productManager.getProducts();
  res.json(products);
});

app.get('/products/:pid', async (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = await productManager.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
