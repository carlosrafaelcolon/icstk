'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// const AutoIncrement = require('mongoose-sequence');
const mongoose = require("mongoose");
// import * as AutoIncrement from 'mongoose-sequence';
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
// model for Publication
const PublicationSchema = new Schema({
    title: String,
    pubId: { type: Number, unique: true },
    themes: [String],
    topics: [String],
    pubDate: Date,
    authors: [String],
    pubType: String,
    publisher: String,
    pageCount: Number,
    summary: String,
    link: String,
    reviewed: { type: Boolean, default: false },
    reviews: [
        {
            reviewer: String,
            reviewLink: String
        }
    ],
    cover: { type: Boolean, default: false },
    coverUrl: String
});
PublicationSchema.plugin(AutoIncrement, { inc_field: 'pubId' });
const Publication = mongoose.model('Publication', PublicationSchema);
exports.Publication = Publication;
//# sourceMappingURL=library.js.map
