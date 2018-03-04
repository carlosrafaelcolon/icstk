"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("../database/models/library");
const libQueryBuilder_1 = require("../database/queries/libQueryBuilder");
exports.default = {
    publications(req, res, next) {
      const searchResultsProp = req.body;
      const libListQuery = libQueryBuilder_1.searchLibQueryBuilder(searchResultsProp.query);
      let perPage = 20;
      let page = searchResultsProp.page || 1;
      library_1.Publication.find(libListQuery)
      .skip((perPage * page) - perPage)
      .sort({ pubDate: -1 })
      .limit(perPage)
      .then((results) => res.json(results))
      .catch(next);
    },
    searchPublications(req, res, next) {
        const searchResultsProp = req.body;
        const libListQuery = libQueryBuilder_1.searchLibQueryBuilder(searchResultsProp.query);
        const projection = searchResultsProp.projection;
        library_1.Publication.find(libListQuery)
            .sort({ pubDate: -1 })
            .then((results) => res.json(results))
            .catch(next);
    },
    recentPubWorks(req, res, next) {
        const searchResultsProp = req.body;
        const libListQuery = libQueryBuilder_1.searchLibQueryBuilder(searchResultsProp.query);
        const projection = searchResultsProp.projection;
        library_1.Publication.find(libListQuery, projection)
            .sort({ pubDate: -1 })
            .limit(3)
            .then((results) => res.json(results))
            .catch(next);
    },
    publication(req, res, next) {
        const publicationId = req.params.pubId;
        library_1.Publication.findOne({ pubId: publicationId })
            .then((results) => res.json(results))
            .catch(next);
    },
    create(req, res, next) {
        const publicationProps = req.body;
        library_1.Publication.create(publicationProps)
            .then(publication => res.json(publication))
            .catch(next);
    },
    edit(req, res, next) {
        const publicationId = req.params.pubId;
        const publicationProps = req.body;
        library_1.Publication.updateOne({ pubId: publicationId }, publicationProps)
            .then(() => library_1.Publication.findOne({ pubId: publicationId }))
            .then(publication => res.send(publication))
            .catch(next);
    },
    delete(req, res, next) {
        const pubId = req.params.pubId;
        library_1.Publication.deleteOne({ pubId: pubId })
            .then(publication => res.status(204).send(publication))
            .catch(next);
    }
};
