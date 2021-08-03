const mongoose = require('mongoose');
const Schema = mongoose.Schema

const playerSchema = new Schema({
    playerId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    wins: {
        type: Number,
        required: true
    },
    losses: {
        type: Number,
        required: true
    },

}, {timestamps: true})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player