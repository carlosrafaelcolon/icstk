"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const OperationController = require('../controllers/operation_controller');
const operation_controller_1 = require("../controllers/operation_controller");
exports.default = (app, authCheck) => {
    app.get('/api/operations', operation_controller_1.default.operations);
    app.post('/api/operations/results', operation_controller_1.default.searchOperations);
    // app.post('/api/operations/admin/results', OperationController.searchAdminOperations);
    app.post('/api/operations/reviewed', operation_controller_1.default.searchReview);
    app.get('/api/operations/recent', operation_controller_1.default.recentOperations);
    app.get('/api/operations/:operationId', operation_controller_1.default.operation);
    app.post('/api/operations', authCheck, operation_controller_1.default.create);
    app.put('/api/operations/:operationId', authCheck, operation_controller_1.default.edit);
    app.delete('/api/operations/:operationId', authCheck, operation_controller_1.default.delete);
};
//# sourceMappingURL=operationRoutes.js.map
