const express = require("express");
const prisma = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const orders = await prisma.$queryRaw`
      SELECT *
      FROM "Orders"
    `;
    res.json({
      success: true,
      data: orders,
      message: 'Orders retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/high-value-users", async (req, res) => {
  try {
    const users = await prisma.$queryRaw`
      SELECT DISTINCT u.id, u.name, u.email, o.total
      FROM "Users" u
      INNER JOIN "Orders" o ON u.id = o."user_id"
      WHERE o.total > 1000000
    `;
    res.json({
      success: true,
      data: users,
      message: 'High value users retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/average-orders", async (req, res) => {
  try {
    const averages = await prisma.$queryRaw`
      SELECT u.id, u.name, AVG(o.total) as average_order
      FROM "Users" u
      LEFT JOIN "Orders" o ON u.id = o."user_id"
      GROUP BY u.id, u.name
    `;
    res.json({
      success: true,
      data: averages,
      message: 'Average orders retrieved successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update-status", async (req, res) => {
  try {
    await prisma.$queryRaw`
      UPDATE "Orders"
      SET status = 'finish'
      WHERE total > 500000
    `;
    res.json({
      success: true,
      message: 'Orders updated successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
