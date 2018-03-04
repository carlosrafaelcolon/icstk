"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const BlogController = require('../controllers/blog_controller');
const blog_controller_1 = require("../controllers/blog_controller");
exports.default = (app, authCheck) => {
    app.get('/api/blog', blog_controller_1.default.allPosts);
    app.get('/api/blog/recent', blog_controller_1.default.recentPosts);
    app.get('/api/blog/reviewed', blog_controller_1.default.searchReview);
    app.post('/api/blog/results', blog_controller_1.default.searchOperations);
    app.post('/api/blog/author', blog_controller_1.default.findByAuthor);
    app.get('/api/blog/:slug', blog_controller_1.default.post);
    app.get('/api/blog/basic/:slug', blog_controller_1.default.basicPost);
    app.post('/api/blog', authCheck, blog_controller_1.default.create);
    app.put('/api/blog/:slug', authCheck, blog_controller_1.default.edit);
    app.delete('/api/blog/:slug', authCheck, blog_controller_1.default.delete);
};
//# sourceMappingURL=blogRoutes.js.map
