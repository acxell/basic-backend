const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

const productController = require("./product/products.controller");
const cartController = require("./carts/carts.controller");
const orderController = require("./orders/orders.controller");
const userController =  require("./user/users.controller")

app.use("/product", productController);
app.use("/cart", cartController);
app.use("/orders", orderController);
app.use("/users", userController);

app.listen(PORT, () => {
  console.log("Server running on port:" + PORT);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
