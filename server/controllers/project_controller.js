"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = require("../database/models/project");
exports.default = {
    allProjects(req, res, next) {
        project_1.Project.find({})
            .sort({ priority: 1 })
            .populate('team')
            .then((results) => res.json(results))
            .catch(next);
    },
    project(req, res, next) {
        const projectId = req.params.projectId;
        project_1.Project.findOne({ projectId: projectId })
            .then((results) => res.json(results))
            .catch(next);
    },
    create(req, res, next) {
        const projectProps = req.body;
        project_1.Project.create(projectProps)
            .then(project => res.json(project))
            .catch(next);
    },
    edit(req, res, next) {
        const projectId = req.params.projectId;
        const projectProps = req.body;
        project_1.Project.updateOne({ projectId: projectId }, projectProps)
            .then(() => project_1.Project.findOne({ projectId: projectId }))
            .then(project => res.send(project))
            .catch(next);
    },
    delete(req, res, next) {
        const projectId = req.params.projectId;
        project_1.Project.deleteOne({ projectId: projectId })
            .then(project => res.status(204).send(project))
            .catch(next);
    }
};
//# sourceMappingURL=project_controller.js.map