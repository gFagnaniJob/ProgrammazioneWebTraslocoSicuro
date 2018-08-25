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
        numeroCivico: { type: Number, required: true },
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

var traslocatoreTorino = new modelloTraslocatore({
    partitaIVA: "654ABC5433",
    nomeAzienda: "Traslochi RTM",
    nomeProprietario: "Fabrizio",
    cognomeProprietario: "Giammarini",
    email: "fabrizio.giammarini@giamail.com",
    indirizzoAzienda: {
        via: "Tunisi",
        numeroCivico: "23",
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

var traslocatoreCamerino = new modelloTraslocatore({
    partitaIVA: "7343HHT42F2",
    nomeAzienda: "SpavoniSRL",
    nomeProprietario: "Laura",
    cognomeProprietario: "Spavoni",
    email: "Laura.Spavoni@giamail.com",
    indirizzoAzienda: {
        via: "Via A.Conti",
        numeroCivico: "10",
        provincia: "Macerata",
        citta: "Camerino",
    },
    costiBaseStanze: {
        cucina: "200",
        salone: "180",
        salaDaPranzo: "180",
        camera: "200",
        bagno: "160",
        ingresso: "100",
        studio: "200",
        balcone: "100",
        soffitta: "180",
        giardino: "150",
        boxGarage: "180",
        ripostiglio: "100",
        cantina: "180",
    },
    costiImballaggioStanze: {
        cucina: "150",
        salone: "150",
        salaDaPranzo: "100",
        camera: "100",
        bagno: "60",
        ingresso: "60",
        studio: "100",
        balcone: "60",
        soffitta: "150",
        giardino: "80",
        boxGarage: "100",
        ripostiglio: "80",
        cantina: "100",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "250",
        salone: "200",
        salaDaPranzo: "160",
        camera: "200",
        bagno: "90",
        ingresso: "90",
        studio: "160",
        balcone: "90",
        soffitta: "200",
        giardino: "90",
        boxGarage: "200",
        ripostiglio: "90",
        cantina: "200",
    },
    costoDistanza: {
        minore400km: "200",
        tra400e800km: "300",
        sopra800km: "600",
    },
    costoDifficolta: {
        pianoterra: "50",
        ascensore: "150",
        senzaAscensorePrimiPiani: "300",
        senzaAscensoreUltimiPiani: "400",
    },
    costoDepositoMerci: "6",

});

var traslocatoreRoma1 = new modelloTraslocatore({
    partitaIVA: "4729RL8L2",
    nomeAzienda: "Capital Traslochi",
    nomeProprietario: "Roberto",
    cognomeProprietario: "Michelini",
    email: "Roberto.Michelini@giamail.com",
    indirizzoAzienda: {
        via: "Filippi",
        numeroCivico: "58",
        provincia: "Roma",
        citta: "Roma",
    },
    costiBaseStanze: {
        cucina: "230",
        salone: "180",
        salaDaPranzo: "150",
        camera: "200",
        bagno: "130",
        ingresso: "80",
        studio: "150",
        balcone: "80",
        soffitta: "150",
        giardino: "100",
        boxGarage: "180",
        ripostiglio: "80",
        cantina: "180",
    },
    costiImballaggioStanze: {
        cucina: "110",
        salone: "100",
        salaDaPranzo: "100",
        camera: "100",
        bagno: "70",
        ingresso: "70",
        studio: "90",
        balcone: "70",
        soffitta: "100",
        giardino: "80",
        boxGarage: "100",
        ripostiglio: "70",
        cantina: "100",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "240",
        salone: "200",
        salaDaPranzo: "190",
        camera: "200",
        bagno: "150",
        ingresso: "50",
        studio: "110",
        balcone: "50",
        soffitta: "200",
        giardino: "120",
        boxGarage: "120",
        ripostiglio: "50",
        cantina: "80",
    },
    costoDistanza: {
        minore400km: "80",
        tra400e800km: "400",
        sopra800km: "750",
    },
    costoDifficolta: {
        pianoterra: "100",
        ascensore: "200",
        senzaAscensorePrimiPiani: "340",
        senzaAscensoreUltimiPiani: "500",
    },
    costoDepositoMerci: "9.5",

});

var traslocatoreRoma2 = new modelloTraslocatore({
    partitaIVA: "4729RL8L2",
    nomeAzienda: "Traslochi Easy",
    nomeProprietario: "Francesca",
    cognomeProprietario: "Garotti",
    email: "Francesca.Garotti@giamail.com",
    indirizzoAzienda: {
        via: "degli elci",
        numeroCivico: "12",
        provincia: "Roma",
        citta: "Roma",
    },
    costiBaseStanze: {
        cucina: "200",
        salone: "160",
        salaDaPranzo: "170",
        camera: "200",
        bagno: "120",
        ingresso: "80",
        studio: "170",
        balcone: "80",
        soffitta: "140",
        giardino: "90",
        boxGarage: "200",
        ripostiglio: "80",
        cantina: "200",
    },
    costiImballaggioStanze: {
        cucina: "100",
        salone: "100",
        salaDaPranzo: "100",
        camera: "100",
        bagno: "60",
        ingresso: "60",
        studio: "80",
        balcone: "60",
        soffitta: "120",
        giardino: "70",
        boxGarage: "120",
        ripostiglio: "60",
        cantina: "120",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "220",
        salone: "200",
        salaDaPranzo: "200",
        camera: "200",
        bagno: "130",
        ingresso: "100",
        studio: "120",
        balcone: "100",
        soffitta: "130",
        giardino: "120",
        boxGarage: "130",
        ripostiglio: "100",
        cantina: "130",
    },
    costoDistanza: {
        minore400km: "100",
        tra400e800km: "400",
        sopra800km: "700",
    },
    costoDifficolta: {
        pianoterra: "70",
        ascensore: "180",
        senzaAscensorePrimiPiani: "300",
        senzaAscensoreUltimiPiani: "400",
    },
    costoDepositoMerci: "7",

});

var traslocatoreNapoli1 = new modelloTraslocatore({
    partitaIVA: "98668TY67U4",
    nomeAzienda: "Traslochi Antichi",
    nomeProprietario: "Giorgio",
    cognomeProprietario: "Pallini",
    email: "Giorgio.Pallini@giamail.com",
    indirizzoAzienda: {
        via: "Elvira Notari",
        numeroCivico: "70",
        provincia: "Napoli",
        citta: "Napoli",
    },
    costiBaseStanze: {
        cucina: "200",
        salone: "160",
        salaDaPranzo: "170",
        camera: "200",
        bagno: "120",
        ingresso: "80",
        studio: "170",
        balcone: "80",
        soffitta: "140",
        giardino: "90",
        boxGarage: "200",
        ripostiglio: "80",
        cantina: "200",
    },
    costiImballaggioStanze: {
        cucina: "100",
        salone: "100",
        salaDaPranzo: "100",
        camera: "100",
        bagno: "60",
        ingresso: "60",
        studio: "80",
        balcone: "60",
        soffitta: "120",
        giardino: "70",
        boxGarage: "120",
        ripostiglio: "60",
        cantina: "120",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "220",
        salone: "200",
        salaDaPranzo: "200",
        camera: "200",
        bagno: "130",
        ingresso: "100",
        studio: "120",
        balcone: "100",
        soffitta: "130",
        giardino: "120",
        boxGarage: "130",
        ripostiglio: "100",
        cantina: "130",
    },
    costoDistanza: {
        minore400km: "100",
        tra400e800km: "400",
        sopra800km: "700",
    },
    costoDifficolta: {
        pianoterra: "70",
        ascensore: "180",
        senzaAscensorePrimiPiani: "300",
        senzaAscensoreUltimiPiani: "400",
    },
    costoDepositoMerci: "7",

});

var traslocatoreNapoli2 = new modelloTraslocatore({
    partitaIVA: "3456772FF53K",
    nomeAzienda: "Campania Traslochi",
    nomeProprietario: "Matteo",
    cognomeProprietario: "Torini",
    email: "Matteo.Torini@giamail.com",
    indirizzoAzienda: {
        via: "Via Piedigrotta",
        numeroCivico: "8",
        provincia: "Napoli",
        citta: "Napoli",
    },
    costiBaseStanze: {
        cucina: "200",
        salone: "180",
        salaDaPranzo: "180",
        camera: "200",
        bagno: "160",
        ingresso: "100",
        studio: "200",
        balcone: "100",
        soffitta: "180",
        giardino: "150",
        boxGarage: "180",
        ripostiglio: "100",
        cantina: "180",
    },
    costiImballaggioStanze: {
        cucina: "150",
        salone: "150",
        salaDaPranzo: "100",
        camera: "100",
        bagno: "60",
        ingresso: "60",
        studio: "100",
        balcone: "60",
        soffitta: "150",
        giardino: "80",
        boxGarage: "100",
        ripostiglio: "80",
        cantina: "100",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "250",
        salone: "200",
        salaDaPranzo: "160",
        camera: "200",
        bagno: "90",
        ingresso: "90",
        studio: "160",
        balcone: "90",
        soffitta: "200",
        giardino: "90",
        boxGarage: "200",
        ripostiglio: "90",
        cantina: "200",
    },
    costoDistanza: {
        minore400km: "200",
        tra400e800km: "300",
        sopra800km: "600",
    },
    costoDifficolta: {
        pianoterra: "50",
        ascensore: "150",
        senzaAscensorePrimiPiani: "300",
        senzaAscensoreUltimiPiani: "400",
    },
    costoDepositoMerci: "6",

});

var traslocatoreFirenze1 = new modelloTraslocatore({
    partitaIVA: "9995643JJ53G",
    nomeAzienda: "Ramini Traslochi",
    nomeProprietario: "Claudia",
    cognomeProprietario: "Ramini",
    email: "Claudia.Ramini@giamail.com",
    indirizzoAzienda: {
        via: "Cimabue",
        numeroCivico: "110",
        provincia: "Firenze",
        citta: "Firenze",
    },
    costiBaseStanze: {
        cucina: "250",
        salone: "200",
        salaDaPranzo: "200",
        camera: "200",
        bagno: "150",
        ingresso: "150",
        studio: "200",
        balcone: "150",
        soffitta: "250",
        giardino: "150",
        boxGarage: "250",
        ripostiglio: "250",
        cantina: "150",
    },
    costiImballaggioStanze: {
        cucina: "130",
        salone: "100",
        salaDaPranzo: "100",
        camera: "100",
        bagno: "80",
        ingresso: "80",
        studio: "100",
        balcone: "80",
        soffitta: "130",
        giardino: "80",
        boxGarage: "130",
        ripostiglio: "130",
        cantina: "80",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "250",
        salone: "200",
        salaDaPranzo: "200",
        camera: "200",
        bagno: "150",
        ingresso: "150",
        studio: "200",
        balcone: "150",
        soffitta: "250",
        giardino: "160",
        boxGarage: "250",
        ripostiglio: "150",
        cantina: "250",
    },
    costoDistanza: {
        minore400km: "300",
        tra400e800km: "500",
        sopra800km: "800",
    },
    costoDifficolta: {
        pianoterra: "100",
        ascensore: "200",
        senzaAscensorePrimiPiani: "350",
        senzaAscensoreUltimiPiani: "500",
    },
    costoDepositoMerci: "7",

});

var traslocatoreFirenze2 = new modelloTraslocatore({
    partitaIVA: "276HJ53FF473",
    nomeAzienda: "Traslochi Perfetti",
    nomeProprietario: "Fiorello",
    cognomeProprietario: "Zampini",
    email: "Fiorello.Zampini@giamail.com",
    indirizzoAzienda: {
        via: "della palancola",
        numeroCivico: "53",
        provincia: "Firenze",
        citta: "Firenze",
    },
    costiBaseStanze: {
        cucina: "250",
        salone: "200",
        salaDaPranzo: "200",
        camera: "200",
        bagno: "140",
        ingresso: "120",
        studio: "180",
        balcone: "120",
        soffitta: "200",
        giardino: "120",
        boxGarage: "200",
        ripostiglio: "120",
        cantina: "200",
    },
    costiImballaggioStanze: {
        cucina: "130",
        salone: "100",
        salaDaPranzo: "100",
        camera: "100",
        bagno: "80",
        ingresso: "60",
        studio: "80",
        balcone: "60",
        soffitta: "100",
        giardino: "60",
        boxGarage: "100",
        ripostiglio: "60",
        cantina: "100",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "230",
        salone: "150",
        salaDaPranzo: "150",
        camera: "150",
        bagno: "80",
        ingresso: "80",
        studio: "150",
        balcone: "80",
        soffitta: "250",
        giardino: "100",
        boxGarage: "230",
        ripostiglio: "100",
        cantina: "230",
    },
    costoDistanza: {
        minore400km: "200",
        tra400e800km: "430",
        sopra800km: "730",
    },
    costoDifficolta: {
        pianoterra: "90",
        ascensore: "230",
        senzaAscensorePrimiPiani: "400",
        senzaAscensoreUltimiPiani: "570",
    },
    costoDepositoMerci: "8",

});

var traslocatoreMilano1 = new modelloTraslocatore({
    partitaIVA: "65RE12W33",
    nomeAzienda: "Traslochi Fratelli Giglio",
    nomeProprietario: "Marcello",
    cognomeProprietario: "Giglio",
    email: "Marcello.Giglio@giamail.com",
    indirizzoAzienda: {
        via: "paolo lomazzo",
        numeroCivico: "86",
        provincia: "Milano",
        citta: "Milano",
    },
    costiBaseStanze: {
        cucina: "280",
        salone: "230",
        salaDaPranzo: "200",
        camera: "220",
        bagno: "180",
        ingresso: "150",
        studio: "200",
        balcone: "150",
        soffitta: "260",
        giardino: "180",
        boxGarage: "260",
        ripostiglio: "150",
        cantina: "260",
    },
    costiImballaggioStanze: {
        cucina: "150",
        salone: "150",
        salaDaPranzo: "130",
        camera: "130",
        bagno: "100",
        ingresso: "80",
        studio: "130",
        balcone: "80",
        soffitta: "130",
        giardino: "80",
        boxGarage: "130",
        ripostiglio: "80",
        cantina: "130",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "250",
        salone: "200",
        salaDaPranzo: "200",
        camera: "200",
        bagno: "150",
        ingresso: "100",
        studio: "200",
        balcone: "100",
        soffitta: "250",
        giardino: "100",
        boxGarage: "260",
        ripostiglio: "100",
        cantina: "260",
    },
    costoDistanza: {
        minore400km: "350",
        tra400e800km: "700",
        sopra800km: "1000",
    },
    costoDifficolta: {
        pianoterra: "200",
        ascensore: "300",
        senzaAscensorePrimiPiani: "400",
        senzaAscensoreUltimiPiani: "500",
    },
    costoDepositoMerci: "10",

});

var traslocatoreMilano2 = new modelloTraslocatore({
    partitaIVA: "877335LX55B",
    nomeAzienda: "Grandi Traslochi",
    nomeProprietario: "Patrizia",
    cognomeProprietario: "Spalo",
    email: "Patrizia.Spalo@giamail.com",
    indirizzoAzienda: {
        via: "Condino",
        numeroCivico: "20",
        provincia: "Milano",
        citta: "Milano",
    },
    costiBaseStanze: {
        cucina: "270",
        salone: "210",
        salaDaPranzo: "210",
        camera: "210",
        bagno: "160",
        ingresso: "160",
        studio: "180",
        balcone: "100",
        soffitta: "240",
        giardino: "160",
        boxGarage: "240",
        ripostiglio: "160",
        cantina: "240",
    },
    costiImballaggioStanze: {
        cucina: "140",
        salone: "140",
        salaDaPranzo: "140",
        camera: "140",
        bagno: "80",
        ingresso: "80",
        studio: "120",
        balcone: "80",
        soffitta: "120",
        giardino: "80",
        boxGarage: "120",
        ripostiglio: "80",
        cantina: "120",
    },
    costiSmontaggioRiassemblaggioStanze: {
        cucina: "270",
        salone: "200",
        salaDaPranzo: "200",
        camera: "200",
        bagno: "180",
        ingresso: "100",
        studio: "190",
        balcone: "100",
        soffitta: "230",
        giardino: "100",
        boxGarage: "230",
        ripostiglio: "100",
        cantina: "230",
    },
    costoDistanza: {
        minore400km: "300",
        tra400e800km: "600",
        sopra800km: "800",
    },
    costoDifficolta: {
        pianoterra: "220",
        ascensore: "320",
        senzaAscensorePrimiPiani: "420",
        senzaAscensoreUltimiPiani: "600",
    },
    costoDepositoMerci: "8", 
});


var traslocatori = [ traslocatoreTorino, traslocatoreCamerino, traslocatoreRoma1, traslocatoreRoma2, traslocatoreNapoli1,
     traslocatoreNapoli2, traslocatoreFirenze1, traslocatoreFirenze2, traslocatoreMilano1, traslocatoreMilano2 ];


module.exports = { modelloTraslocatore, traslocatori };