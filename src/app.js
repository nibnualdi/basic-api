console.log("Wait a moment!");

require("dotenv").config();

const express = require("express");
const router = require("./routers/router");
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
