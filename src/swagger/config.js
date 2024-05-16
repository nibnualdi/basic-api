const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const router = require("express").Router();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Basic API",
      version: "0.1.0",
      description: "This is a simple CRUD API application with auth",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Ibnu Aldi Nugroho",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["src/routers/*.js"],
};

const specs = swaggerJsdoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = router;
