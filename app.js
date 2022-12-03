const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars").engine;
const connectDB = require("./config/db");
const router = require("./routes/index");

// Load Config
dotenv.config({ path: "./config/config.env" });

// connect to DB
connectDB();

// create express app
const app = express();

// using logger (morgan) 
if(process.env.NODE_ENV = "development") {
    app.use(morgan("dev"));
}

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: "main",extname: '.hbs'}));
app.set('view engine', '.hbs');
// app.set('views', './views');

// Routes
app.use("/", router)


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port: ${PORT}`));