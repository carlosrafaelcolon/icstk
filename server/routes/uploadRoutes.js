"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const UploadController = require('../controllers/upload_controller');
const upload_controller_1 = require("../controllers/upload_controller");
exports.default = (app, authCheck) => {
    app.post('/uploads/images', authCheck, upload_controller_1.default.image);
    app.post('/uploads/documents', authCheck, upload_controller_1.default.document);
};
//# sourceMappingURL=uploadRoutes.js.map
