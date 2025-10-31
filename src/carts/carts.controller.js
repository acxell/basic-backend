const express = require("express");
const prisma = require("../db");
const router = express.Router();

let carts = [];
let cartId = 1;

router.post("/", async (req, res) => {
  try {
    const { product: productId, quantity } = req.body;

    const product = await prisma.products.findUnique({
      where: {
        id: parseInt(productId)
      }
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const newCart = await prisma.carts.create({
      data: {
        product_id: product.id,
        quantity: parseFloat(quantity)
      },
      include: {
        products: true
      }
    });

    const cartItem = {
      id: newCart.id,
      product: newCart.products.name,
      quantity: newCart.quantity
    };

    carts.push(cartItem);

    res.json({
      success: true,
      data: cartItem,
      message: 'Product added to cart successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const dbCarts = await prisma.carts.findMany({
      include: {
        products: true
      }
    });

    const formattedCarts = dbCarts.map(cart => ({
      id: cart.id,
      product: cart.products.name,
      quantity: cart.quantity
    }));

    res.json({
      success: true,
      data: formattedCarts,
      message: 'Carts retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
