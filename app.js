const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars").engine;
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");

const router = require("./routes/index");
const authRouter = require("./routes/auth");

// Load Config
dotenv.config({ path: "./config/config.env" });

// Passport
require("./config/passport")(passport);

// connect to DB
connectDB();

// create express app
const app = express();

// using logger (morgan) 
if (process.env.NODE_ENV = "development") {
    app.use(morgan("dev"));
}

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: "main", extname: '.hbs' }));
app.set('view engine', '.hbs');
// app.set('views', './views');

// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Add Public folder
app.use(express.static(path.join(__dirname, "public")))

// Routes
app.use("/", router)
app.use("/auth", authRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port: ${PORT}`));