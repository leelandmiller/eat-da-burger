const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");

// Import routes
const burgerRoutes = require("./controllers/burgersController");

const port = process.env.PORT || 3000;

let app = express();


app.use('/css', express.static(__dirname + "/node_modules/bulma/css/"));

app.use('/scripts', express.static(__dirname + "/node_modules/jquery/dist/"));

// Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static(__dirname + "/public/assets/"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Give the server access to routes.
app.use("/", burgerRoutes);

app.listen(port, () => console.log("App running: http://localhost:3000"));
