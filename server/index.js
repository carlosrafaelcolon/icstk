"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = require("errorhandler");
const app = require('./server');
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
    console.log(('App is running at http://localhost:%d in %s mode'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=index.js.map
