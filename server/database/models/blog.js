'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    slug: { type: String, slug: 'title', slug_padding_size: 4, unique: true },
    title: String,
    subtitle: String,
    category: {
        type: String,
        required: true
    },
    tags: [String],
    date: Date,
    updated: { type: Date, default: Date.now },
    authors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'People'
        }
    ],
    body: {
        type: String,
        required: true
    },
    pdf: { type: Boolean, default: false },
    pdfLink: {
        type: String,
        default: null
    },
    reviewed: { type: Boolean, default: false },
    resourcesIncluded: { type: Boolean, default: false },
    resources: {
        type: String,
        default: null
    }
});
// Save slugs to 'myslug' field.
mongoose.plugin(slug);
const Post = mongoose.model('Post', PostSchema);
exports.Post = Post;
//# sourceMappingURL=blog.js.map