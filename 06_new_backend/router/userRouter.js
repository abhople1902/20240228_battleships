// Express setup
const express = require("express");
const router = express.Router();
// get useerController
const userController = require("../controllers/userController");
// Middleware setup
const { verifyJwt, getUserMiddleware } = require("../dependencies/jwtHelpers");
router.get("/getUserStats", verifyJwt, getUserMiddleware, userController.getUserStats)

module.exports = router;
