const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var traslocatoriSchema = new Schema({
    partitaIVA: { type: String, max: 100, required: true },
    nomeAzienda: { type: String, max: 100, required: true },
    nomeProprietario: { type: String, max: 100, required: true },
    cognomeProprietario: { type: String, max: 100, required: true },
    email: { type: String, max: 100, required: true },
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
        ingresso: { type: Number, required: true },
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
        ingresso: { type: Number, required: true },
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
        ingresso: { type: Number, required: true },
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

var traslocatore1 = new modelloTraslocatore({
    partitaIVA: "6545433",
    nomeAzienda: "TraslochiRTM",
    nomeProprietario: "Fabrizio",
    cognomeProprietario: "Giammarini",
    email: "fabrizio.giammarini@giamail.com",
    indirizzoAzienda: {
        via: "degli elci",
        provincia: "Torino",
        citta: "Torino",
    },
    costiBaseStanze: {
        cucina: "260",
        salone: "230",
        salaDaPranzo: "200",
        camera: "230",
        bagno: "200",
        ingresso: "150",
        studio: "230",
        balcone: "150",
        soffitta: "200",
        giardino: "150",
        boxGarage: "200",
        ripostiglio: "150",
        cantina: "200",
    },
    costiImballaggioStanze: {
        cucina: "150",
        salone: "120",
        salaDaPranzo: "100",
        camera: "100",
        bagno: "80",
        ingresso: "80",
        studio: "120",
        balcone: "80",
        soffitta: "130",
        giardino: "90",
        boxGarage: "130",
        ripostiglio: "90",
        cantina: "130",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "300",
        salone: "230",
        salaDaPranzo: "200",
        camera: "230",
        bagno: "100",
        ingresso: "40",
        studio: "100",
        balcone: "50",
        soffitta: "200",
        giardino: "100",
        boxGarage: "200",
        ripostiglio: "100",
        cantina: "200",
    },
    costoDistanza: {
        minore400km: "400",
        tra400e800km: "600",
        sopra800km: "1000",
    },
    costoDifficolta: {
        pianoterra: "200",
        ascensore: "300",
        senzaAscensorePrimiPiani: "450",
        senzaAscensoreUltimiPiani: "600",
    },
    costoDepositoMerci: "10",

});





module.exports = { modelloTraslocatore, traslocatore1 };