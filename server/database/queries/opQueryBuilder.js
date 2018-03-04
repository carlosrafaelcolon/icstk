"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function opAdminListQueryBuilder(searchResults) {
    let operationListQuery = {};
    if (searchResults.hasOwnProperty('targets') && searchResults.targets.length) {
        operationListQuery['countries.targets.country'] = {
            '$in': searchResults.targets
        };
    }
    if (searchResults.hasOwnProperty('attackers') && searchResults.attackers.length) {
        operationListQuery['countries.attackers.country'] = {
            '$in': searchResults.attackers
        };
    }
    if (searchResults.hasOwnProperty('weapons') && searchResults.weapons.length) {
        operationListQuery['type.weaponTypes.term'] = {
            '$in': searchResults.weapons
        };
    }
    if (searchResults.hasOwnProperty('actions') && searchResults.actions.length) {
        operationListQuery['type.actionTypes.term'] = {
            '$in': searchResults.actions
        };
    }
    if (searchResults.hasOwnProperty('mission') && searchResults.mission.length) {
        operationListQuery['mission.type'] = {
            '$in': searchResults.mission
        };
    }
    if (searchResults.hasOwnProperty('objects') && searchResults.objects.length) {
        operationListQuery['objects.type'] = {
            '$in': searchResults.objects
        };
    }
    // Ranges Between Two Specific Dates
    if (searchResults.hasOwnProperty('minDate') && searchResults.hasOwnProperty('maxDate')) {
        operationListQuery.date = {
            '$gte': new Date(searchResults.minDate),
            '$lte': new Date(searchResults.maxDate),
        };
    }
    // Start Date Only
    if (searchResults.hasOwnProperty('minDate') && !searchResults.hasOwnProperty('maxDate')) {
        operationListQuery.date = {
            '$gte': new Date(searchResults.minDate)
        };
    }
    // End Date only
    if (!searchResults.hasOwnProperty('minDate') && searchResults.hasOwnProperty('maxDate')) {
        operationListQuery.date = {
            '$lte': new Date(searchResults.maxDate)
        };
    }
    if (searchResults.hasOwnProperty('reviewed') && searchResults.reviewed !== null) {
        operationListQuery.reviewed = { $ne: false };
    }
    if (searchResults.hasOwnProperty('excludeWeapons') && searchResults.excludeWeapons) {
        operationListQuery['type.weaponTypes.clear'] = searchResults.excludeWeapons;
    }
    if (searchResults.hasOwnProperty('countStatistic') && searchResults.countStatistic) {
        operationListQuery.numStrikes = { '$gt': 0 };
        operationListQuery.sources = { $exists: true };
        operationListQuery['sources.countStatistics'] = { $ne: false };
    }
    operationListQuery.crossBorder = { $ne: false };
    return operationListQuery;
}
exports.opAdminListQueryBuilder = opAdminListQueryBuilder;
function opListQueryBuilder(searchResults) {
    let operationListQuery = {};
    if (searchResults.hasOwnProperty('targets') && searchResults.targets.length) {
        operationListQuery['countries.targets.country'] = {
            '$in': searchResults.targets
        };
    }
    if (searchResults.hasOwnProperty('attackers') && searchResults.attackers.length) {
        operationListQuery['countries.attackers.country'] = {
            '$in': searchResults.attackers
        };
    }
    if (searchResults.hasOwnProperty('weapons') && searchResults.weapons.length) {
        operationListQuery['type.weaponTypes.term'] = {
            '$in': searchResults.weapons
        };
    }
    if (searchResults.hasOwnProperty('actions') && searchResults.actions.length) {
        operationListQuery['type.actionTypes.term'] = {
            '$in': searchResults.actions
        };
    }
    if (searchResults.hasOwnProperty('mission') && searchResults.mission.length) {
        operationListQuery['mission.type'] = {
            '$in': searchResults.mission
        };
    }
    if (searchResults.hasOwnProperty('objects') && searchResults.objects.length) {
        operationListQuery['objects.type'] = {
            '$in': searchResults.objects
        };
    }
    // Ranges Between Two Specific Dates
    if (searchResults.hasOwnProperty('minDate') && searchResults.hasOwnProperty('maxDate')) {
        operationListQuery.date = {
            '$gte': new Date(searchResults.minDate),
            '$lte': new Date(searchResults.maxDate),
        };
    }
    // Start Date Only
    if (searchResults.hasOwnProperty('minDate') && !searchResults.hasOwnProperty('maxDate')) {
        operationListQuery.date = {
            '$gte': new Date(searchResults.minDate)
        };
    }
    // End Date only
    if (!searchResults.hasOwnProperty('minDate') && searchResults.hasOwnProperty('maxDate')) {
        operationListQuery.date = {
            '$lte': new Date(searchResults.maxDate)
        };
    }
    if (searchResults.hasOwnProperty('reviewed') && searchResults.reviewed !== null) {
        operationListQuery.reviewed = { $ne: false };
    }
    if (searchResults.hasOwnProperty('crossBorder')) {
        operationListQuery.crossBorder = { $ne: false };
    }
    if (searchResults.hasOwnProperty('excludeWeapons') && searchResults.excludeWeapons) {
        operationListQuery['type.weaponTypes.clear'] = searchResults.excludeWeapons;
    }
    if (searchResults.hasOwnProperty('civilians') && searchResults.civilians) {
        operationListQuery['sources.mainReport.casualties.civilians'] = { '$gt': 0 };
    }
    if (searchResults.hasOwnProperty('hvts') && searchResults.hvts) {
        operationListQuery['sources.mainReport.casualties.hvts'] = { '$gt': 0 };
    }
    if (searchResults.hasOwnProperty('hac') && searchResults.hac) {
        operationListQuery['sources.mainReport.casualties.hvts'] = { '$gt': 0 };
        operationListQuery['sources.mainReport.casualties.civilians'] = { '$gt': 0 };
    }
    if (searchResults.hasOwnProperty('countStatistic') && searchResults.countStatistic) {
        operationListQuery.numStrikes = { '$gt': 0 };
        operationListQuery.sources = { $exists: true };
        operationListQuery['sources.countStatistics'] = { $ne: false };
    }
    return operationListQuery;
}
exports.opListQueryBuilder = opListQueryBuilder;
function operationQueryBuilder(searchResults) {
    let operationQuery = {};
    operationQuery.operationId = searchResults.operationId;
    if (searchResults.hasOwnProperty('countStatistic') && searchResults.countStatistic) {
        operationQuery.numStrikes = { '$gt': 0 };
        operationQuery.sources = { $exists: true };
        operationQuery['sources.countStatistics'] = { $ne: false };
    }
    return operationQuery;
}
exports.operationQueryBuilder = operationQueryBuilder;
