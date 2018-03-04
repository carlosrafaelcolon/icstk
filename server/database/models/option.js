'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Model for Option List
const OptionSchema = new Schema({
    allCountries: [String],
    operations: {
        targets: [
            {
                country: String,
                selected: { type: Boolean, default: false }
            }
        ],
        attackers: [
            {
                country: String,
                selected: { type: Boolean, default: false }
            }
        ],
        weaponTypes: [
            {
                term: String,
                selected: { type: Boolean, default: false }
            }
        ],
        privateWeaponTypes: [
          {
              term: String,
              selected: { type: Boolean, default: false }
          }
        ],
        subWeapon: [
            {
                term: String,
                selected: { type: Boolean, default: false }
            }
        ],
        actionTypes: [
            {
                term: String,
                selected: { type: Boolean, default: false }
            }
        ],
        privateActionTypes: [
          {
              term: String,
              selected: { type: Boolean, default: false }
          }
        ],
        objects: [
            {
                type: { type: String },
                selected: { type: Boolean, default: false }
            }
        ],
        mission: [
            {
                type: { type: String },
                selected: { type: Boolean, default: false }
            }
        ]
    },
    library: {
        themes: [String],
        pubType: [String]
    },
    articleCat: [String],
    groups: [String],
    sources: [String],
    casualties: [
      {
          display: String,
          value: Number
      }
  ],
  status: [String],
  conflictStatus: [String],
  motion: [String],
  time: [String],
  minDate: { type: Date, default: null },
  maxDate: { type: Date, default: null },
  weaponClear: { type: Boolean, default: false },
  includeNonReviewed: { type: Boolean, default: false },
  crossBorder: { type: Boolean, default: true }
});
const Option = mongoose.model('Option', OptionSchema);
exports.default = Option;
//# sourceMappingURL=option.js.map
