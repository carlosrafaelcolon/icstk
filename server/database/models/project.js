'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// const AutoIncrement = require('mongoose-sequence');
const mongoose = require("mongoose");
// import * as AutoIncrement from 'mongoose-sequence';
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
// model for Project
const ProjectSchema = new Schema({
    projectId: { type: Number, unique: true },
    title: String,
    goal: String,
    status: { type: String, default: 'No Status Updates' },
    priority: { type: Number, default: 3 },
    updated: { type: Date, default: Date.now },
    team: [
        {
            type: Schema.Types.ObjectId,
            ref: 'People'
        }
    ],
    editor: String
});
ProjectSchema.plugin(AutoIncrement, { inc_field: 'projectId' });
const Project = mongoose.model('Project', ProjectSchema);
exports.Project = Project;
//# sourceMappingURL=project.js.map