/**
 * @swagger
 * components:
 *   schemas:
 *     Auths:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Your email
 *         password:
 *           type: string
 *           description: Your password
 *     ResponseAuths:
 *       type: object
 *       properties:
 *         messages:
 *           type: string
 *           description: Description of the status response
 *         accessToken:
 *           type: string
 *           description: The access token you need for some specific api request
 *         refreshToken:
 *           type: string
 *           description: the refresh token for generate new access token & refresh token when the last access token is expired
 *
 */
/**
 * @swagger
 * tags:
 *   name: Auths
 *   description: The auth API
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auths]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/Auths'
 *               - type: object
 *               - required:
 *                   - fullname
 *               - properties:
 *                   fullname:
 *                     type: string
 *                     description: Your fullname
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseAuths'
 *       401:
 *         description: Unauthorized
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auths]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auths'
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseAuths'
 *       404:
 *         description: Not Found
 * /auth/refresh-token:
 *   post:
 *     summary: Generate new access token & refresh token
 *     tags: [Auths]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: true
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Your refresh token
 *     responses:
 *       200:
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseAuths'
 *       400:
 *         description: Bad request
 */

const express = require("express");
const router = express.Router();

const { login, register, refreshToken } = require("../controller/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/refresh-token", refreshToken);

module.exports = router;
