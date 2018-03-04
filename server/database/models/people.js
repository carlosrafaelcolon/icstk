'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
// const slug = require('mongoose-slug-generator');
// model for peoples
const Schema = mongoose.Schema;
const PeopleSchema = new Schema({
    slug: { type: String, slug: 'name', slug_padding_size: 4, unique: true },
    name: String,
    title: String,
    imgPath: {
        thumb: {
            type: String,
            default: null
        },
        full: {
            type: String,
            default: null
        }
    },
    socialMedia: {
        twitter: {
            type: String,
            default: null
        },
        github: {
            type: String,
            default: null
        },
        website: {
            type: String,
            default: null
        },
        linkedin: {
            type: String,
            default: null
        }
    },
    shortBio: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    bio: String,
    publications:{type: String, default: null},
    display: {
        type: Boolean,
        default: true
    },
    active: {
        type: Boolean,
        default: true
    }
});
// Save slugs to 'myslug' field.
mongoose.plugin(slug);
const People = mongoose.model('People', PeopleSchema);
exports.default = People;
//# sourceMappingURL=people.js.map
