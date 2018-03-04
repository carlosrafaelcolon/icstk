"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_controller_1 = require("../controllers/project_controller");
exports.default = (app, authCheck) => {
    app.get('/api/projects', project_controller_1.default.allProjects);
    app.get('/api/projects/:projectId', project_controller_1.default.project);
    app.post('/api/projects', authCheck, project_controller_1.default.create);
    app.put('/api/projects/:projectId', authCheck, project_controller_1.default.edit);
    app.delete('/api/projects/:projectId', authCheck, project_controller_1.default.delete);
};
//# sourceMappingURL=projectRoutes.js.map
