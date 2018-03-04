"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sourceSchema = new Schema({
    title: String,
    link: String,
    altLink: String,
    pubDate: Date,
    countStatistics: { type: Boolean, default: false },
    repeated: { type: Boolean, default: false },
    tags: [String],
    mainReport: {
        casualties: {
            totals: { type: Number, default: 0 },
            susMils: { type: Number, default: 0 },
            civilians: { type: Number, default: 0 },
            unknowns: { type: Number, default: 0 },
            hvts: { type: Number, default: 0 },
            children: { type: Number, default: 0 }
        },
        sources: [String],
        target: {
            unsorted: [String],
            targetTypeDetails: String,
            additionalDetails: String,
            location: String,
            targetType: String,
            time: String,
        },
        killed: {
            status: String,
            unsorted: [String],
            additionalDetails: String
        },
        weaponsReported: [String],
        weapons: {
            terms: [String],
            ambiguous: { type: Boolean, default: false }
        }
    }
});
exports.sourceSchema = sourceSchema;
//# sourceMappingURL=source_schema.js.map