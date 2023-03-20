const express = require('express');
const mongoose = require('mongoose')
const app = express();
var conn = mongoose.connection;

const state = {
    db: null
}

module.exports.connect = (done) => {

    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/foodRecipe', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB', err));

}

module.exports.get = () => {
    return state.db
}

require('./Category')