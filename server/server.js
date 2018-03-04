"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression"); // compresses requests
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const methodOverride = require("method-override");
const path = require("path");
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const peopleRoutes_1 = require("./routes/peopleRoutes");
const blogRoutes_1 = require("./routes/blogRoutes");
const libRoutes_1 = require("./routes/libRoutes");
const optionRoutes_1 = require("./routes/optionRoutes");
const statRoutes_1 = require("./routes/statRoutes");
const operationRoutes_1 = require("./routes/operationRoutes");
const uploadRoutes_1 = require("./routes/uploadRoutes");
const projectRoutes_1 = require("./routes/projectRoutes");
const emailRoutes_1 = require("./routes/emailRoutes");
// Import environment variables
const index_1 = require("./config/index");
/*
 |--------------------------------------
 | MongoDB
 |--------------------------------------
 */
mongoose.Promise = bluebird;
mongoose.connect(index_1.default.mongoUrl).then(() => {
    console.log('Database Connected');
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
}).catch(err => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
    // process.exit();
});
/*
 |--------------------------------------
 | Express configuration
 |--------------------------------------
 */
const app = express();
app.set('port', index_1.default.port || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, '../dist')));

const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${index_1.default.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    // This is the identifier we set when we created the API
    audience: index_1.default.AUTH0_API_AUDIENCE,
    issuer: `https://${index_1.default.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});
/*
 |--------------------------------------
 | API  routes.
 |--------------------------------------
 */
peopleRoutes_1.default(app, authCheck);
blogRoutes_1.default(app, authCheck);
libRoutes_1.default(app, authCheck);
optionRoutes_1.default(app, authCheck);
statRoutes_1.default(app);
operationRoutes_1.default(app, authCheck);
projectRoutes_1.default(app, authCheck);
uploadRoutes_1.default(app, authCheck);
emailRoutes_1.default(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
module.exports = app;
