"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stats_controller_1 = require("../controllers/stats_controller");
exports.default = (app) => {
    // Over Statistics URLs
    app.post('/statistics/basic/primary', stats_controller_1.default.basicPrimaryData);
    app.post('/statistics/basic/range', stats_controller_1.default.basicRangeData);
    // Yearly breakdown Stat URLs
    app.post('/statistics/year/primary', stats_controller_1.default.primaryDataYearBreakdown);
    app.post('/statistics/year/range', stats_controller_1.default.rangeDataYearBreakdown);
    // Yearly&Monthly breakdown stats
    app.post('/statistics/month/primary', stats_controller_1.default.primaryDataMonthBreakdown);
    app.post('/statistics/month/range', stats_controller_1.default.rangeDataMonthBreakdown);
    // Source range for single operation
    app.post('/statistics/operationId', stats_controller_1.default.singleOperationRangeData);
    // N count based on Themes
    app.get('/statistics/themes', stats_controller_1.default.libThemeCount);
    // N count based on Topics
    app.get('/statistics/topics', stats_controller_1.default.libTopicCount);
    // N count based on Topics
    app.get('/statistics/article/topics', stats_controller_1.default.artTopicCount);
    // N count based on press tags
    app.get('/statistics/tags', stats_controller_1.default.opSourceCount);
    // N count based on press title
    app.post('/statistics/opLanding', stats_controller_1.default.homeOpStat);
};
//# sourceMappingURL=statRoutes.js.map
