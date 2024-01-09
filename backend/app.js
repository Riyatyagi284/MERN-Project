const express = require("express")
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload");
const path = require("path");

const cors = require('cors')


const errorMiddleware = require("./middleware/error");

const app = express()

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended:true}));
app.use(fileUpload());

// Route import
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")

app.use("/api/v1",product)
app.use("/api/v1",user)



app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;