"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../database/models/operation");
// const Operation = require('../database/models/operation');
const opQueryBuilder_1 = require("../database/queries/opQueryBuilder");
exports.default = {
    operations(req, res, next) {
        operation_1.Operation.find({})
            .sort({ date: -1 })
            .then((results) => res.json(results))
            .catch(next);
    },
    recentOperations(req, res, next) {
        operation_1.Operation.find({ reviewed: { $ne: false } })
            .sort({ date: -1 })
            .limit(4)
            .then((results) => res.json(results))
            .catch(next);
    },
    searchReview(req, res, next) {
        const searchResultsProp = req.body;
        let perPage = 20;
        let page = searchResultsProp.page || 1;
        const projection = searchResultsProp.projection;
        operation_1.Operation.find({ reviewed: { $ne: true } }, projection)
            .skip((perPage * page) - perPage)
            .sort({ updated: -1 })
            .limit(perPage)
            .then((results) => res.json(results))
            .catch(next);
    },
    searchOperations(req, res, next) {
        const searchResultsProp = req.body;
        const operationListQuery = opQueryBuilder_1.opListQueryBuilder(searchResultsProp.query);
        let perPage = 20;
        let page = searchResultsProp.page || 1;
        const projection = searchResultsProp.projection;
        operation_1.Operation.find(operationListQuery, projection)
            .skip((perPage * page) - perPage)
            .sort({ date: -1 })
            .limit(perPage)
            .then((results) => res.json(results))
            .catch(next);
    },
    searchAdminOperations(req, res, next) {
        const searchResultsProp = req.body;
        const operationListQuery = opQueryBuilder_1.opListQueryBuilder(searchResultsProp.query);
        let perPage = 20;
        let page = searchResultsProp.page || 1;
        const projection = searchResultsProp.projection;
        operation_1.Operation.find(operationListQuery, projection)
            .skip((perPage * page) - perPage)
            .sort({ date: -1 })
            .limit(perPage)
            .then((results) => res.json(results))
            .catch(next);
    },
    operation(req, res, next) {
        const operationId = req.params.operationId;
        operation_1.Operation.findOne({ operationId: operationId })
            .then((results) => res.json(results))
            .catch(next);
    },
    create(req, res, next) {
        const operationProps = req.body;
        operation_1.Operation.create(operationProps)
            .then(operation => res.json(operation))
            .catch(next);
    },
    edit(req, res, next) {
        const operationId = req.params.operationId;
        const operationProps = req.body;
        operation_1.Operation.updateOne({ operationId: operationId }, operationProps)
            .then(() => operation_1.Operation.findOne({ operationId: operationId }))
            .then(operation => res.send(operation))
            .catch(next);
    },
    delete(req, res, next) {
        const operationId = req.params.operationId;
        operation_1.Operation.deleteOne({ operationId: operationId })
            .then(operation => res.status(204).send(operation))
            .catch(next);
    }
};
//# sourceMappingURL=operation_controller.js.map
