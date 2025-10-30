const express = require("express");
const prisma = require("../db");
const router = express.Router();

let carts = [];
let cartId = 1;

router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await prisma.$queryRaw`
      SELECT name, price 
      FROM "Product" 
      WHERE id = ${productId}
    `;

    if (!product || product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cartItem = {
      id: cartId++,
      product: product[0].name,
      quantity: quantity
    };

    carts.push(cartItem);

    res.json({
      success: true,
      data: cartItem,
      message: 'Product added to cart successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", (req, res) => {
  res.json({
    success: true,
    data: carts,
    message: 'Carts retrieved successfully'
  });
});

module.exports = router;
