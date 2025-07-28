const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { createMotivation } = require("../controllers/admin/createMotivations");

const adminRoutes = express.Router();

adminRoutes.post("/motivation", verifyToken, createMotivation);

module.exports = adminRoutes