"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = require("../database/models/option");
exports.default = {
    option(req, res, next) {
        option_1.default.findOne({})
            .then((results) => res.json(results))
            .catch(next);
    },
    create(req, res, next) {
        const optionProps = req.body;
        option_1.default.create(optionProps)
            .then(option => res.json(option))
            .catch(next);
    },
    edit(req, res, next) {
        const optionId = req.params._id;
        const optionProps = req.body;
        option_1.default.updateOne({ _id: optionId }, optionProps)
            .then(() => option_1.default.findOne({ _id: optionId }))
            .then(option => res.send(option))
            .catch(next);
    }
};
//# sourceMappingURL=option_controller.js.map