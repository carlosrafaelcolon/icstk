"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blog_1 = require("../database/models/blog");
const artQueryBuilder_1 = require("../database/queries/artQueryBuilder");
// const query = require("../database/queries/artQueryBuilder");
exports.default = {
    allPosts(req, res, next) {
        blog_1.Post.find({})
            .sort({ date: -1 })
            .populate('authors')
            .then((results) => res.json(results))
            .catch(next);
    },
    searchReview(req, res, next) {
        blog_1.Post.find({ reviewed: { $ne: true } })
            .sort({ date: -1 })
            .populate('authors')
            .then((results) => res.json(results))
            .catch(next);
    },
    recentPosts(req, res, next) {
        blog_1.Post.find({reviewed: true})
            .sort({ date: -1 })
            .populate('authors')
            .limit(3)
            .then((results) => res.json(results))
            .catch(next);
    },
    post(req, res, next) {
        const postSlug = req.params.slug;
        blog_1.Post.findOne({ slug: postSlug })
            .populate('authors')
            .then((results) => res.json(results))
            .catch(next);
    },
    basicPost(req, res, next) {
        const postSlug = req.params.slug;
        blog_1.Post.findOne({ slug: postSlug })
            .then((results) => res.json(results))
            .catch(next);
    },
    findByAuthor(req, res, next) {
        const searchResultsProp = req.body;
        const articleListQuery = artQueryBuilder_1.artListQueryBuilder(searchResultsProp.query);
        const projection = searchResultsProp.projection;
        blog_1.Post.find(articleListQuery, projection)
            .sort({ date: -1 })
            .then((results) => res.json(results))
            .catch(next);
    },
    searchOperations(req, res, next) {
        const searchResultsProp = req.body;
        const articleListQuery = artQueryBuilder_1.artListQueryBuilder(searchResultsProp);
        blog_1.Post.find(articleListQuery)
            .sort({ date: -1 })
            .populate('authors')
            .then((results) => res.json(results))
            .catch(next);
    },
    create(req, res, next) {
        const postProps = req.body;
        blog_1.Post.create(postProps)
            .then(post => res.json(post))
            .catch(next);
    },
    edit(req, res, next) {
        const postSlug = req.params.slug;
        const postProps = req.body;
        blog_1.Post.updateOne({ slug: postSlug }, postProps)
            .then(() => blog_1.Post.findOne({ slug: postSlug }))
            .then(post => res.send(post))
            .catch(next);
    },
    delete(req, res, next) {
        const postSlug = req.params.slug;
        blog_1.Post.deleteOne({ slug: postSlug })
            .then(post => res.status(204).send(post))
            .catch(next);
    }
};
//# sourceMappingURL=blog_controller.js.map
