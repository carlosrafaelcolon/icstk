'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const source_schema_1 = require("./source_schema");
// const sourceSchema = require('./source_schema');
// model for Strike
const PointSchema = new Schema({
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], index: '2dsphere' }
});
const OperationSchema = new Schema({
    operationId: { type: Number, unique: true },
    date: Date,
    time: { type: String, default: 'Unclear' },
    numStrikes: Number,
    reviewed: { type: Boolean, default: false },
    extended: { type: Boolean, default: false },
    onBorder: { type: Boolean, default: false },
    crossBorder: { type: Boolean, default: true },
    countries: {
        attackers: [{
                country: String,
                doubt: { type: Boolean, default: false },
                probability: String,
                headGov: { type: String, default: 'Unclear' }
            }],
        targets: [{
                country: String,
                region: String,
                division: String,
                subdivision: String,
                locale: String,
                conflictStatus: { type: String, default: 'Unclear' },
                geometry: PointSchema
            }]
    },
    mission: [{
            type: { type: String, default: 'Unclear' },
            clear: { type: Boolean, default: false }
        }],
    type: {
        weaponTypes: [{
                term: String,
                weaponDetail: { type: String, default: 'N/A' },
                clear: Boolean,
                primary: { type: Boolean, default: true }
            }],
        actionTypes: [{
                term: String,
                clear: Boolean,
                primary: { type: Boolean, default: true }
            }],
    },
    objects: [{
            type: { type: String, default: 'Other' },
            state: { type: String, default: 'Unclear' },
            clear: { type: Boolean, default: false },
            primary: { type: Boolean, default: true }
        }],
    groupReported: { type: Boolean, default: false },
    group: [{
            name: String,
            clear: Boolean
        }],
    peopleReported: { type: Boolean, default: false },
    people: [{
            name: String,
            status: String,
            clear: Boolean
        }],
    casualties: {
        totals: { type: Number, default: 0 },
        susMils: { type: Number, default: 0 },
        civilians: { type: Number, default: 0 },
        unknowns: { type: Number, default: 0 },
        hvts: { type: Number, default: 0 },
        children: { type: Number, default: 0 }
    },
    content: String,
    sources: [source_schema_1.sourceSchema],
    updated: { type: Date, default: Date.now },
    comments: { type: String, default: 'No Comment' },
    editor: { type: String, default: 'Carlos R. Colon' }
});
OperationSchema.plugin(AutoIncrement, { inc_field: 'operationId' });
const Operation = mongoose.model('Operation', OperationSchema);
exports.Operation = Operation;
//# sourceMappingURL=operation.js.map
