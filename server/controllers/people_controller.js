"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const people_1 = require("../database/models/people");
// const People = require('../database/models/people');
exports.default = {
    privatePeople(req, res, next) {
        people_1.default.find({})
            .sort({ name: 1 })
            .then((results) => res.json(results))
            .catch(next);
    },
    publicPeople(req, res, next) {
        people_1.default.find({ display: { $ne: false } })
            .sort({ name: 1 })
            .then((results) => res.json(results))
            .catch(next);
    },
    person(req, res, next) {
        const personSlug = req.params.slug;
        people_1.default.findOne({ slug: personSlug })
            .then((results) => res.json(results))
            .catch(next);
    },
    searchByEmail(req, res, next) {
        const searchResultsProp = req.body;
        people_1.default.findOne(searchResultsProp)
            .then((results) => res.json(results))
            .catch(next);
    },
    create(req, res, next) {
        const personProps = req.body;
        people_1.default.create(personProps)
            .then(person => res.json(person))
            .catch(next);
    },
    edit(req, res, next) {
        const personSlug = req.params.slug;
        const personProps = req.body;
        people_1.default.updateOne({ slug: personSlug }, personProps)
            .then(() => people_1.default.findOne({ slug: personSlug }))
            .then(person => res.send(person))
            .catch(next);
    },
    delete(req, res, next) {
        const personSlug = req.params.slug;
        people_1.default.deleteOne({ slug: personSlug })
            .then(person => res.status(204).send(person))
            .catch(next);
    }
};
//# sourceMappingURL=people_controller.js.map
