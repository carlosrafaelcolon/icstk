"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operation_1 = require("../database/models/operation");
const library_1 = require("../database/models/library");
const blog_1 = require("../database/models/blog");
// const Operation = require('../database/models/operation');
const opQueryBuilder_1 = require("../database/queries/opQueryBuilder");
exports.default = {
    basicPrimaryData(req, res, next) {
        const searchResultsProp = req.body;
        const operationListQuery = opQueryBuilder_1.opListQueryBuilder(searchResultsProp);
        operation_1.Operation.aggregate([
            { $match: operationListQuery },
            { $project: {
                    numStrikes: 1,
                    casualties: 1,
                } },
            { $group: {
                    _id: null,
                    count: { $sum: '$numStrikes' },
                    case: { $sum: 1 },
                    sumMilitantKilled: { $sum: '$casualties.susMils' },
                    sumCivilianKilled: { $sum: '$casualties.civilians' },
                    sumUnknownsKilled: { $sum: '$casualties.unknowns' },
                    sumTotalKilled: { $sum: '$casualties.totals' },
                } },
            { $project: {
                    _id: 0,
                    sumMilitantKilled: 1,
                    sumCivilianKilled: 1,
                    sumUnknownsKilled: 1,
                    sumTotalKilled: 1,
                    count: 1,
                    case: 1,
                    avgMilitant: {
                        $divide: [
                            '$sumMilitantKilled',
                            '$count'
                        ]
                    },
                    avgCivilian: {
                        $divide: [
                            '$sumCivilianKilled',
                            '$count'
                        ]
                    },
                    avgUnknown: {
                        $divide: [
                            '$sumUnknownsKilled',
                            '$count'
                        ]
                    },
                    avgTotal: {
                        $divide: [
                            '$sumTotalKilled',
                            '$count'
                        ]
                    }
                } }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    basicRangeData(req, res, next) {
        const searchResultsProp = req.body;
        const operationListQuery = opQueryBuilder_1.opListQueryBuilder(searchResultsProp);
        operation_1.Operation.aggregate([
            { $match: operationListQuery },
            { $project: {
                    minMil: { $min: '$sources.mainReport.casualties.susMils' },
                    minUnknown: { $min: '$sources.mainReport.casualties.unknowns' },
                    minCivilian: { $min: '$sources.mainReport.casualties.civilians' },
                    minTotal: { $min: '$sources.mainReport.casualties.totals' },
                    maxMil: { $max: '$sources.mainReport.casualties.susMils' },
                    maxUnknown: { $max: '$sources.mainReport.casualties.unknowns' },
                    maxCivilian: { $max: '$sources.mainReport.casualties.civilians' },
                    maxTotal: { $max: '$sources.mainReport.casualties.totals' }
                } },
            { $group: {
                    _id: null,
                    sumLowMilitantKilled: { $sum: '$minMil' },
                    sumLowCivilianKilled: { $sum: '$minCivilian' },
                    sumLowUnknownsKilled: { $sum: '$minUnknown' },
                    sumLowTotalKilled: { $sum: '$minTotal' },
                    sumHighMilitantKilled: { $sum: '$maxMil' },
                    sumHighCivilianKilled: { $sum: '$maxCivilian' },
                    sumHighUnknownsKilled: { $sum: '$maxUnknown' },
                    sumHighTotalKilled: { $sum: '$maxTotal' }
                } },
            { $project: {
                    sumLowMilitantKilled: 1,
                    sumLowCivilianKilled: 1,
                    sumLowUnknownsKilled: 1,
                    sumLowTotalKilled: 1,
                    sumHighMilitantKilled: 1,
                    sumHighCivilianKilled: 1,
                    sumHighUnknownsKilled: 1,
                    sumHighTotalKilled: 1,
                    avgTotal: { $avg: ['$sumLowTotalKilled', '$sumHighTotalKilled'] },
                    avgMilitant: { $avg: ['$sumLowMilitantKilled', '$sumHighMilitantKilled'] },
                    avgCivilian: { $avg: ['$sumLowCivilianKilled', '$sumHighCivilianKilled'] },
                    avgUnknown: { $avg: ['$sumLowUnknownsKilled', '$sumHighUnknownsKilled'] }
                } }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    singleOperationRangeData(req, res, next) {
        const searchResultsProp = req.body;
        const operationQuery = opQueryBuilder_1.operationQueryBuilder(searchResultsProp);
        operation_1.Operation.aggregate([
            { $match: operationQuery },
            // {
            //   $project: {
            //     sources: {
            //       $filter: {
            //          input: "$sources",
            //          as: "source",
            //          cond: { $eq: [ "$$source.countStatistics", true ] }
            //       }
            //     }
            //   }
            // },
            { $project: {
                    minMil: { $min: '$sources.mainReport.casualties.susMils' },
                    minUnknown: { $min: '$sources.mainReport.casualties.unknowns' },
                    minCivilian: { $min: '$sources.mainReport.casualties.civilians' },
                    minTotal: { $min: '$sources.mainReport.casualties.totals' },
                    maxMil: { $max: '$sources.mainReport.casualties.susMils' },
                    maxUnknown: { $max: '$sources.mainReport.casualties.unknowns' },
                    maxCivilian: { $max: '$sources.mainReport.casualties.civilians' },
                    maxTotal: { $max: '$sources.mainReport.casualties.totals' }
                } },
            { $group: {
                    _id: null,
                    sumLowMilitantKilled: { $sum: '$minMil' },
                    sumLowCivilianKilled: { $sum: '$minCivilian' },
                    sumLowUnknownsKilled: { $sum: '$minUnknown' },
                    sumLowTotalKilled: { $sum: '$minTotal' },
                    sumHighMilitantKilled: { $sum: '$maxMil' },
                    sumHighCivilianKilled: { $sum: '$maxCivilian' },
                    sumHighUnknownsKilled: { $sum: '$maxUnknown' },
                    sumHighTotalKilled: { $sum: '$maxTotal' }
                } },
            { $project: {
                    sumLowMilitantKilled: 1,
                    sumLowCivilianKilled: 1,
                    sumLowUnknownsKilled: 1,
                    sumLowTotalKilled: 1,
                    sumHighMilitantKilled: 1,
                    sumHighCivilianKilled: 1,
                    sumHighUnknownsKilled: 1,
                    sumHighTotalKilled: 1,
                    avgTotal: { $avg: ['$sumLowTotalKilled', '$sumHighTotalKilled'] },
                    avgMilitant: { $avg: ['$sumLowMilitantKilled', '$sumHighMilitantKilled'] },
                    avgCivilian: { $avg: ['$sumLowCivilianKilled', '$sumHighCivilianKilled'] },
                    avgUnknown: { $avg: ['$sumLowUnknownsKilled', '$sumHighUnknownsKilled'] }
                } }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    primaryDataYearBreakdown(req, res, next) {
        const searchResultsProp = req.body;
        const operationListQuery = opQueryBuilder_1.opListQueryBuilder(searchResultsProp);
        operation_1.Operation.aggregate([
            { $match: operationListQuery },
            { $project: {
                    _id: 0,
                    date: 1,
                    numStrikes: 1,
                    casualties: 1
                } },
            {
                $group: {
                    _id: { year: { $year: '$date' } },
                    sumMilitantKilled: { $sum: '$casualties.susMils' },
                    sumCivilianKilled: { $sum: '$casualties.civilians' },
                    sumUnknownsKilled: { $sum: '$casualties.unknowns' },
                    sumTotalKilled: { $sum: '$casualties.totals' },
                    count: { $sum: '$numStrikes' },
                    case: { $sum: 1 }
                }
            },
            { $project: {
                    year: '$_id.year',
                    _id: 0,
                    sumMilitantKilled: 1,
                    sumCivilianKilled: 1,
                    sumUnknownsKilled: 1,
                    sumTotalKilled: 1,
                    count: 1,
                    case: 1,
                    avgMilitant: { $cond: [{ $eq: ['$count', 0] }, 0, { $divide: ['$sumMilitantKilled', '$count'] }] },
                    avgCivilian: { $cond: [{ $eq: ['$count', 0] }, 0, { $divide: ['$sumCivilianKilled', '$count'] }] },
                    avgUnknown: { $cond: [{ $eq: ['$count', 0] }, 0, { $divide: ['$sumUnknownsKilled', '$count'] }] },
                    avgTotal: { $cond: [{ $eq: ['$count', 0] }, 0, { $divide: ['$sumTotalKilled', '$count'] }] }
                } },
            {
                $sort: { year: 1 }
            }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    rangeDataYearBreakdown(req, res, next) {
        const searchResultsProp = req.body;
        const operationListQuery = opQueryBuilder_1.opListQueryBuilder(searchResultsProp);
        operation_1.Operation.aggregate([
            { $match: operationListQuery },
            { $project: {
                    date: 1,
                    numStrikes: 1,
                    minMil: { $min: '$sources.mainReport.casualties.susMils' },
                    minUnknown: { $min: '$sources.mainReport.casualties.unknowns' },
                    minCivilian: { $min: '$sources.mainReport.casualties.civilians' },
                    minTotal: { $min: '$sources.mainReport.casualties.totals' },
                    maxMil: { $max: '$sources.mainReport.casualties.susMils' },
                    maxUnknown: { $max: '$sources.mainReport.casualties.unknowns' },
                    maxCivilian: { $max: '$sources.mainReport.casualties.civilians' },
                    maxTotal: { $max: '$sources.mainReport.casualties.totals' }
                } },
            { $group: {
                    _id: { year: { $year: '$date' } },
                    count: { $sum: '$numStrikes' },
                    case: { $sum: 1 },
                    sumLowMilitantKilled: { $sum: '$minMil' },
                    sumLowCivilianKilled: { $sum: '$minCivilian' },
                    sumLowUnknownsKilled: { $sum: '$minUnknown' },
                    sumLowTotalKilled: { $sum: '$minTotal' },
                    sumHighMilitantKilled: { $sum: '$maxMil' },
                    sumHighCivilianKilled: { $sum: '$maxCivilian' },
                    sumHighUnknownsKilled: { $sum: '$maxUnknown' },
                    sumHighTotalKilled: { $sum: '$maxTotal' }
                } },
            { $project: {
                    year: '$_id.year',
                    _id: 0,
                    count: 1,
                    case: 1,
                    sumLowMilitantKilled: 1,
                    sumLowCivilianKilled: 1,
                    sumLowUnknownsKilled: 1,
                    sumLowTotalKilled: 1,
                    sumHighMilitantKilled: 1,
                    sumHighCivilianKilled: 1,
                    sumHighUnknownsKilled: 1,
                    sumHighTotalKilled: 1,
                    avgTotal: { $avg: ['$sumLowTotalKilled', '$sumHighTotalKilled'] },
                    avgMilitant: { $avg: ['$sumLowMilitantKilled', '$sumHighMilitantKilled'] },
                    avgCivilian: { $avg: ['$sumLowCivilianKilled', '$sumHighCivilianKilled'] },
                    avgUnknown: { $avg: ['$sumLowUnknownsKilled', '$sumHighUnknownsKilled'] }
                } },
            {
                $sort: { year: 1 }
            }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    primaryDataMonthBreakdown(req, res, next) {
        const searchResultsProp = req.body;
        const operationListQuery = opQueryBuilder_1.opListQueryBuilder(searchResultsProp);
        operation_1.Operation.aggregate([
            { $match: operationListQuery },
            { $project: {
                    _id: 0,
                    date: 1,
                    numStrikes: 1,
                    casualties: 1
                } },
            {
                $group: {
                    _id: { month: { $month: '$date' }, year: { $year: '$date' } },
                    sumMilitantKilled: { $sum: '$casualties.susMils' },
                    sumCivilianKilled: { $sum: '$casualties.civilians' },
                    sumUnknownsKilled: { $sum: '$casualties.unknowns' },
                    sumTotalKilled: { $sum: '$casualties.totals' },
                    count: { $sum: '$numStrikes' },
                    case: { $sum: 1 }
                }
            },
            { $project: {
                    year: '$_id.year',
                    month: '$_id.month',
                    _id: 0,
                    sumMilitantKilled: 1,
                    sumCivilianKilled: 1,
                    sumUnknownsKilled: 1,
                    sumTotalKilled: 1,
                    count: 1,
                    case: 1,
                    avgMilitant: { $cond: [{ $eq: ['$count', 0] }, 0, { $divide: ['$sumMilitantKilled', '$count'] }] },
                    avgCivilian: { $cond: [{ $eq: ['$count', 0] }, 0, { $divide: ['$sumCivilianKilled', '$count'] }] },
                    avgUnknown: { $cond: [{ $eq: ['$count', 0] }, 0, { $divide: ['$sumUnknownsKilled', '$count'] }] },
                    avgTotal: { $cond: [{ $eq: ['$count', 0] }, 0, { $divide: ['$sumTotalKilled', '$count'] }] }
                } },
            {
                $sort: { year: 1, month: 1 }
            }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    rangeDataMonthBreakdown(req, res, next) {
        const searchResultsProp = req.body;
        const operationListQuery = opQueryBuilder_1.opListQueryBuilder(searchResultsProp);
        operation_1.Operation.aggregate([
            { $match: operationListQuery },
            { $project: {
                    date: 1,
                    numStrikes: 1,
                    minMil: { $min: '$sources.mainReport.casualties.susMils' },
                    minUnknown: { $min: '$sources.mainReport.casualties.unknowns' },
                    minCivilian: { $min: '$sources.mainReport.casualties.civilians' },
                    minTotal: { $min: '$sources.mainReport.casualties.totals' },
                    maxMil: { $max: '$sources.mainReport.casualties.susMils' },
                    maxUnknown: { $max: '$sources.mainReport.casualties.unknowns' },
                    maxCivilian: { $max: '$sources.mainReport.casualties.civilians' },
                    maxTotal: { $max: '$sources.mainReport.casualties.totals' }
                } },
            { $group: {
                    _id: { month: { $month: '$date' }, year: { $year: '$date' } },
                    count: { $sum: '$numStrikes' },
                    case: { $sum: 1 },
                    sumLowMilitantKilled: { $sum: '$minMil' },
                    sumLowCivilianKilled: { $sum: '$minCivilian' },
                    sumLowUnknownsKilled: { $sum: '$minUnknown' },
                    sumLowTotalKilled: { $sum: '$minTotal' },
                    sumHighMilitantKilled: { $sum: '$maxMil' },
                    sumHighCivilianKilled: { $sum: '$maxCivilian' },
                    sumHighUnknownsKilled: { $sum: '$maxUnknown' },
                    sumHighTotalKilled: { $sum: '$maxTotal' }
                } },
            { $project: {
                    year: '$_id.year',
                    month: '$_id.month',
                    _id: 0,
                    count: 1,
                    case: 1,
                    sumLowMilitantKilled: 1,
                    sumLowCivilianKilled: 1,
                    sumLowUnknownsKilled: 1,
                    sumLowTotalKilled: 1,
                    sumHighMilitantKilled: 1,
                    sumHighCivilianKilled: 1,
                    sumHighUnknownsKilled: 1,
                    sumHighTotalKilled: 1,
                    avgTotal: { $avg: ['$sumLowTotalKilled', '$sumHighTotalKilled'] },
                    avgMilitant: { $avg: ['$sumLowMilitantKilled', '$sumHighMilitantKilled'] },
                    avgCivilian: { $avg: ['$sumLowCivilianKilled', '$sumHighCivilianKilled'] },
                    avgUnknown: { $avg: ['$sumLowUnknownsKilled', '$sumHighUnknownsKilled'] }
                } },
            {
                $sort: { year: 1, month: 1 }
            }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    libThemeCount(req, res, next) {
        library_1.Publication.aggregate([
            { $unwind: '$themes' },
            { $group: {
                    _id: { theme: '$themes' },
                    count: { $sum: 1 }
                } },
            { $project: {
                    theme: '$_id.theme',
                    _id: 0,
                    count: 1
                } },
            {
                $sort: { theme: 1 }
            }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    libTopicCount(req, res, next) {
        library_1.Publication.aggregate([
            { $unwind: '$topics' },
            { $group: {
                    _id: { topic: '$topics' },
                    count: { $sum: 1 }
                } },
            { $project: {
                    topic: '$_id.topic',
                    _id: 0,
                    count: 1
                } },
            {
                $sort: { topic: 1 }
            }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    artTopicCount(req, res, next) {
        blog_1.Post.aggregate([
            { $unwind: '$tags' },
            { $group: {
                    _id: { topic: '$tags' },
                    count: { $sum: 1 }
                } },
            { $project: {
                    topic: '$_id.topic',
                    _id: 0,
                    count: 1
                } },
            {
                $sort: { topic: 1 }
            }
        ])
            .then((results) => res.json(results))
            .catch(next);
    },
    opSourceCount(req, res, next) {
      operation_1.Operation.aggregate([
          { $unwind: '$sources' },
          { $group: {
                  _id: { source: '$sources' }
              } },
          { $project: {
                  source: '$_id.source',
                  _id: 0
              } },
            { $unwind: '$source.tags' },
            { $group: {
              _id: { tag: '$source.tags' },
              count: { $sum: 1 }
          } },
          { $project: {
            tag: '$_id.tag',
            _id: 0,
            count: 1
        } },

          {
              $sort: { tag: 1 }
          }
      ])
          .then((results) => res.json(results))
          .catch(next);
    },
    homeOpStat(req, res, next) {
      const searchResultsProp = req.body;
      const operationListQuery = opQueryBuilder_1.opListQueryBuilder(searchResultsProp);
      operation_1.Operation.aggregate([
          { $match: operationListQuery },
          { $unwind: '$countries.targets' },
          {
            $project: {
              target: '$countries.targets',
              numStrikes: 1,
              casualties: 1,
              'countries.targets': 1
            }
          },
          {
            $group: {
              _id: { country: '$target.country' },
              count: { $sum: '$numStrikes' },
              case: { $sum: 1 },
              sumMilitantKilled: { $sum: '$casualties.susMils' },
              sumCivilianKilled: { $sum: '$casualties.civilians' },
              sumUnknownsKilled: { $sum: '$casualties.unknowns' },
              sumTotalKilled: { $sum: '$casualties.totals' }
            }
          },
          {
            $project: {
              country: '$_id.country',
              _id: 0,
              count: 1,
              case: 1,
              sumMilitantKilled: 1,
              sumCivilianKilled: 1,
              sumUnknownsKilled: 1,
              sumTotalKilled: 1
            }
          },
          {
            $sort: { country: 1 }
          }
      ])
          .then((results) => res.json(results))
          .catch(next);
    }
};
//# sourceMappingURL=stats_controller.js.map
