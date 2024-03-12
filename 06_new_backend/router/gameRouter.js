const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const { verifyJwt, getUserMiddleware } = require("../dependencies/jwtHelpers");

/**
 * @swagger
 * /start:
 *   post:
 *     summary: Create a New Game
 *     description: Creates a new entry in the database and returns the game ID.
 *     tags:
 *     - Game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 */
router.post("/start", verifyJwt, getUserMiddleware, gameController.createGame);

/**
 * @swagger
 * /api/check-ship:
 *   post:
 *     summary: Check if the index is already stored in the opponent's user or not.
 *     description: Check if the index is already stored in the opponent's user or not.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShipPlacementRequest'
 *     responses:
 *       '200':
 *         description: Ships placements saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                   example: Ships placements saved successfully.
 *       '404':
 *         description: Player not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Player not found.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Internal server error.
 */
router.post("/check-ship", verifyJwt, getUserMiddleware, gameController.checkShipPlacement)

 /**
 * @swagger
 * /place-ship:
 *   post:
 *     summary: Save the ship placements
 *     description: Save the ship placements for the game
 *     tags: [Ships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShipPlacementRequest'
 *     responses:
 *       '200':
 *         description: Ships placements saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                   example: Ships placements saved successfully.
 *       '400':
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Invalid input.
 *       '401':
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Game not found.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Internal server error.
 */
router.post("/place-ship",verifyJwt,getUserMiddleware,gameController. saveShipPlacements)

/**
 * @swagger
 * /updateProduct:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product in the e-commerce system.
 *     tags:
 *       - Sellers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the product to be updated.
 *               title:
 *                 type: string
 *                 description: New name of the product.
 *               description:
 *                 type: string
 *                 description: New description of the product.
 *               stock:
 *                 type: number
 *                 description: New available stock.
 *               thumbnailUrl:
 *                 type: string
 *                 description: New URL of the product's thumbnail.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: New array of URLs for product images.
 *               category:
 *                 type: string
 *                 description: New product category.
 *               price:
 *                 type: number
 *                 description: New price of the product.
 *               discountPrice:
 *                 type: number
 *                 description: New discounted price of the product.
 *     responses:
 *       '200':
 *         description: Successfully updated product
 *         content:
 *           application/json:
 *             example:
 *               product:
 *                 title: "Updated Smartphone X"
 *                 description: "An updated and feature-rich smartphone."
 *                 stock: 150
 *                 thumbnailUrl: "https://example.com/updated-thumbnail.jpg"
 *                 images:
 *                   - "https://example.com/updated-image1.jpg"
 *                   - "https://example.com/updated-image2.jpg"
 *                 category: "Updated Electronics"
 *                 price: 599.99
 *                 discountPrice: 499.99
 *               updatedAt: "2024-03-16T12:00:00Z"
 *       '400':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid input"
 *       '401':
 *         description: Unauthorized. User is not the seller of this product.
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized for this product"
 *       '404':
 *         description: Product not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */
router.put("/product", verifyJwt, getUserMiddleware, gameController.updateProduct);

/**
 * @swagger
 * /deleteProduct:
 *   delete:
 *     summary: Delete a product
 *     description: Delete an existing product from the e-commerce system.
 *     tags:
 *       - Sellers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the product to be deleted.
 *     responses:
 *       '200':
 *         description: Successfully deleted product
 *         content:
 *           application/json:
 *             example:
 *               message: "Product deleted"
 *       '401':
 *         description: Unauthorized. User is not the seller of this product.
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized for this product"
 *       '404':
 *         description: Product not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */
router.delete("/product", verifyJwt, getUserMiddleware, gameController.deleteProduct);

router.post("/dashboard", verifyJwt, getUserMiddleware, gameController.getDashboard);

module.exports = router;
