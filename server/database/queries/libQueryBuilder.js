"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function searchLibQueryBuilder(searchResults) {
    let libListQuery = {};
    if (searchResults.hasOwnProperty('search') && searchResults.search !== '') {
        libListQuery.$text = {
            '$search': searchResults.search
        };
    }
    if (searchResults.hasOwnProperty('themes') && searchResults.themes.length) {
        libListQuery.themes = {
            '$in': searchResults.themes
        };
    }
    if (searchResults.hasOwnProperty('topics') && searchResults.topics.length) {
        libListQuery.topics = {
            '$in': searchResults.topics
        };
    }
    if (searchResults.hasOwnProperty('authors') && searchResults.authors.length) {
      libListQuery.authors = {
          '$in': searchResults.authors
      };
    }
    if (searchResults.hasOwnProperty('pubType') && searchResults.pubType.length) {
      libListQuery.pubType = searchResults.pubType;
    }
    // Ranges Between Two Specific Dates
    if (searchResults.hasOwnProperty('minDate') && searchResults.hasOwnProperty('maxDate')) {
        libListQuery.pubDate = {
            '$gte': new Date(searchResults.minDate),
            '$lte': new Date(searchResults.maxDate),
        };
    }
    // Start Date Only
    if (searchResults.hasOwnProperty('minDate') && !searchResults.hasOwnProperty('maxDate')) {
        libListQuery.pubDate = {
            '$gte': new Date(searchResults.minDate)
        };
    }
    // End Date only
    if (!searchResults.hasOwnProperty('minDate') && searchResults.hasOwnProperty('maxDate')) {
        libListQuery.pubDate = {
            '$lte': new Date(searchResults.maxDate)
        };
    }
    return libListQuery;
}
exports.searchLibQueryBuilder = searchLibQueryBuilder;
