"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const PeopleController = require('../controllers/people_controller');
const people_controller_1 = require("../controllers/people_controller");
exports.default = (app, authCheck) => {
    app.get('/api/people/public', people_controller_1.default.publicPeople);
    app.get('/api/people/private', authCheck, people_controller_1.default.privatePeople);
    app.get('/api/people/:slug', people_controller_1.default.person);
    app.post('/api/people/email',  people_controller_1.default.searchByEmail);
    app.post('/api/people', authCheck, people_controller_1.default.create);
    app.put('/api/people/:slug', authCheck, people_controller_1.default.edit);
    app.delete('/api/people/:slug', authCheck, people_controller_1.default.delete);
};
//# sourceMappingURL=peopleRoutes.js.map
