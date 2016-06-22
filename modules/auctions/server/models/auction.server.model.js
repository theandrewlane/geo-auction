'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Auction Schema
 */
var AuctionSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    startingBid: {
        type: Number,
        default: '',
        trim: true,
        required: 'Starting bid must not be blank'
    },
    bidIncrement: {
        type: Number,
        default: '1',
        trim: true,
        required: 'A bid increment is required'
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Auction', AuctionSchema);
