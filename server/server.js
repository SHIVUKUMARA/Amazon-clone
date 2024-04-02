require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("./db/conection");
const cookieParser = require("cookie-parser");

const Products = require("./models/productsSchema");

const DefaultData = require("./defaultdata");
const cors = require("cors");
const router = require("./routes/router");

app.use(express.json());   {/* install cors(npm i cors) to avoid errors while exporting backend to frontend */}
app.use(cookieParser(""));
app.use(cors());
app.use(router);
 
const port = process.env.Port || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

DefaultData();  