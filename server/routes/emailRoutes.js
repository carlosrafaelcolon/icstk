"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_controller_1 = require("../controllers/email_controller");
exports.default = (app) => {
    app.post('/api/email', email_controller_1.default.sendMail);
};
//# sourceMappingURL=emailRoutes.js.map