const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var traslocatoriSchema = new Schema({
    partitaIVA: { type: String, max: 100, required: true },
    //TODO completare cambi tabella
});

var modelloTraslocatore = mongoose.model('traslocatori', traslocatoriSchema, 'traslocatori');

module.exports = modelloTraslocatore;