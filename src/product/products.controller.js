const express = require("express");
const prisma = require("../db");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const products = await prisma.$queryRaw`
      SELECT *
      FROM "Products"
    `;
    res.json({
      success: true,
      data: products,
      message: 'Products retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
