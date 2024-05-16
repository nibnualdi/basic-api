/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       name: Authorization
 *       description: 'Bearer token to access these api endpoints'
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - fullname
 *         - email
 *         - password
 *       properties:
 *         fullname:
 *           type: string
 *           description: Your fullname
 *         email:
 *           type: string
 *           description: Your email
 *         password:
 *           type: string
 *           description: Your password
 *     ResponseUsers:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-increment id
 *         fullname:
 *           type: string
 *           description: Your fullname
 *         email:
 *           type: string
 *           description: Your email
 *         password:
 *           type: string
 *           description: Your password
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Description the date of row is created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Description the date of row is updated
 *     ResponseUsers2:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Description of the status response
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: Auto-increment id
 *             fullname:
 *               type: string
 *               description: Your fullname
 *             email:
 *               type: string
 *               description: Your email
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Description the date of row is created
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Description the date of row is updated
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users API
 * /users:
 *   get:
 *     summary: Show all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ResponseUsers'
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUsers2'
 *       400:
 *         description: Bad request
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseUsers'
 *       404:
 *         description: Not found
 *   put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Users'
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseUsers2'
 *      404:
 *        description: Not found
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: Ok
 *       404:
 *         description: Not found
 */

const express = require("express");
const router = express.Router();

const loginOnly = require("../middleware/loginOnly");
const { create, update, remove, show, index } = require("../controller/userController");

router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.get("/", [loginOnly], show);
router.get("/:id", index);

module.exports = router;
