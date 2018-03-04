"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const LibController = require('../controllers/lib_controller');
const lib_controller_1 = require("../controllers/lib_controller");
exports.default = (app, authCheck) => {
    app.post('/api/library/short-list', lib_controller_1.default.publications);
    app.get('/api/library/:pubId', lib_controller_1.default.publication);
    app.post('/api/library/recent', lib_controller_1.default.recentPubWorks);
    app.post('/api/library', authCheck, lib_controller_1.default.create);
    app.post('/api/library/search', lib_controller_1.default.searchPublications);
    app.put('/api/library/:pubId', authCheck, lib_controller_1.default.edit);
    app.delete('/api/library/:pubId', authCheck, lib_controller_1.default.delete);
};
//# sourceMappingURL=libRoutes.js.map
