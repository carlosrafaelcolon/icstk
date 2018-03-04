"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function artListQueryBuilder(searchResults) {
    let articleListQuery = {};
    if (searchResults.hasOwnProperty('authors') && searchResults.authors.length) {
        articleListQuery.authors = {
            '$in': searchResults.authors
        };
    }
    if (searchResults.hasOwnProperty('reviewed') && searchResults.reviewed !== null) {
        articleListQuery.reviewed = searchResults.reviewed;
    }
    return articleListQuery;
}
exports.artListQueryBuilder = artListQueryBuilder;
//# sourceMappingURL=artQueryBuilder.js.map
