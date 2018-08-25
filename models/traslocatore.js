const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var traslocatoriSchema = new Schema({
    partitaIVA: { type: String, max: 100, required: true },
    nomeAzienda: { type: String, max: 100, required: true },
    nomeProprietario: { type: String, max: 100, required: true },
    cognomeProprietario: { type: String, max: 100, required: true },
    indirizzoAzienda: {
        via: { type: String, required: true },
        provincia: { type: String, required: true },
        citta: { type: String, required: true },
    },
    costiBaseStanze: {
        cucina: { type: Number, required: true },
        salone: { type: Number, required: true },
        salaDaPranzo: { type: Number, required: true },
        camera: { type: Number, required: true },
        bagno: { type: Number, required: true },
        ingressso: { type: Number, required: true },
        studio: { type: Number, required: true },
        balcone: { type: Number, required: true },
        soffitta: { type: Number, required: true },
        giardino: { type: Number, required: true },
        boxGarage: { type: Number, required: true },
        ripostiglio: { type: Number, required: true },
        cantina: { type: Number, required: true },
    },
    costiImballaggioStanze: {
        cucina: { type: Number, required: true },
        salone: { type: Number, required: true },
        salaDaPranzo: { type: Number, required: true },
        camera: { type: Number, required: true },
        bagno: { type: Number, required: true },
        ingressso: { type: Number, required: true },
        studio: { type: Number, required: true },
        balcone: { type: Number, required: true },
        soffitta: { type: Number, required: true },
        giardino: { type: Number, required: true },
        boxGarage: { type: Number, required: true },
        ripostiglio: { type: Number, required: true },
        cantina: { type: Number, required: true },
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: { type: Number, required: true },
        salone: { type: Number, required: true },
        salaDaPranzo: { type: Number, required: true },
        camera: { type: Number, required: true },
        bagno: { type: Number, required: true },
        ingressso: { type: Number, required: true },
        studio: { type: Number, required: true },
        balcone: { type: Number, required: true },
        soffitta: { type: Number, required: true },
        giardino: { type: Number, required: true },
        boxGarage: { type: Number, required: true },
        ripostiglio: { type: Number, required: true },
        cantina: { type: Number, required: true },
    },
    costoDistanza: {
        minore400km: { type: Number, required: true },
        tra400e800km: { type: Number, required: true },
        sopra800km: { type: Number, required: true },
    },
    costoDifficolta: {
        pianoterra: { type: Number, required: true },
        ascensore: { type: Number, required: true },
        senzaAscensorePrimiPiani: { type: Number, required: true },
        senzaAscensoreUltimiPiani: { type: Number, required: true },
    },
    costoDepositoMerci: { type: Number, required: true },

});

var modelloTraslocatore = mongoose.model('traslocatori', traslocatoriSchema, 'traslocatori');

module.exports = modelloTraslocatore;