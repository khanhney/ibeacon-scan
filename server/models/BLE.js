const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const ApiSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    minor:  {
        type: String,
        required: true
    },
    nameProduct:  {
        type: String,
    },
    priceProduct:  {
        type: String,
    },
    madeIn:  {
        type: String,
    },
    info:  {
        type: String,
    },
    img:  {
        type: String,
    },
});

const Api = mongoose.model('Api', ApiSchema);

module.exports = Api;