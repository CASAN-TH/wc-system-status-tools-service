'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SystemstatustoolSchema = new Schema({
    name: {
        type: String
    },
    action: {
        type: String
    },
    description: {
        type: String
    },
    success: {
        type: Boolean
    },
    message: {
        type: String
    },
    confirm: {
        type: Boolean
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Systemstatustool", SystemstatustoolSchema);