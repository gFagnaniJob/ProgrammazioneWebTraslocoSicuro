const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var prenotazioneSchema = new Schema({
    viaPartenza: { type: String, required: true },
    numeroCivicoPartenza: { type: Number, required: true },
    capPartenza: {type: Number, required: true},
    cittaPartenza : {type: String, required: true},
    statoPartenza : {type: String, required: true},
    ascensorePartenza : {type: String, required: true},
    pianoPartenza : {type: Number, required: true},
    viaArrivo: { type: String, required: true },
    numeroCivicoArrivo: { type: Number, required: true },
    capArrivo: {type: Number, required: true},
    cittaArrivo : {type: String, required: true},
    statoArrivo : {type: String, required: true},
    ascensoreArrivo :{type: String, required:true},
    pianoArrivo : {type: Number, required: true},
    stanze : {type: mongoose.Schema.Types.Mixed , required:true},
    imballaggio :{type: String, required: true},
    smontaggioRiassemblaggio : {type: String, required: true},
    depositoMerci : {type: String, required: true},
    



});

var modelloPrenotazione = mongoose.model('prenotazione', prenotazioneSchema, 'prenotazione');


module.exports = { modelloPrenotazione, prenotazioneSchema };