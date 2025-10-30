const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await prisma.$queryRaw`
      SELECT *
      FROM "Users"
    `;
    res.json({
      success: true,
      data: users,
      message: 'Users retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
