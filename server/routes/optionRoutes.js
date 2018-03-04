"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const OptionController = require('../controllers/option_controller');
const option_controller_1 = require("../controllers/option_controller");
exports.default = (app, authCheck) => {
    app.get('/options', option_controller_1.default.option);
    app.post('/options', authCheck, option_controller_1.default.create);
    app.put('/options/:_id', option_controller_1.default.edit);
};
//# sourceMappingURL=optionRoutes.js.map
