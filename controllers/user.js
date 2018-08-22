const ModelloUtente = require('../models/user');
/*function controlloData(data){
    /*
    var dataInserita = new Date(data);
    var anno = dataInserita.getFullYear();
    var dataAttuale = new Date();
    dataMaggiorenne = dataAttuale.setFullYear(anno-18);
    if(dataInserita > dataMaggiorenne){
        return false;
    }
    return true;
}*/
module.exports = {
    controlloData: (data) => {
        var dataInserita = new Date(data);
        console.log("dataInserita", dataInserita);
        var annoInserito = dataInserita.getFullYear();
        var meseInserito = dataInserita.getMonth() + 1;
        var giornoInserito = dataInserita.getDate();
        var dataAttuale = new Date();
        console.log("dataAttuale", dataAttuale);
        var annoAttuale = dataAttuale.getFullYear();
        var meseAttuale = dataAttuale.getMonth() + 1;
        var giornoAttuale = dataAttuale.getDate();
        var minimoAnnoValido = annoAttuale - 18;

        if (annoInserito < minimoAnnoValido) {
            return true;
        } else if (annoInserito > minimoAnnoValido) {
            return false;
        } else if (annoInserito === minimoAnnoValido) {
            if (meseInserito < meseAttuale) {
                return true;
            } else if (meseInserito > meseAttuale) {
                return false;
            } else if (meseInserito === meseAttuale) {
                if (giornoInserito <= giornoAttuale) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },

    controllaPasswordCoincidenti: (pw1, pw2) => {
        if (pw1 === pw2) {
            return true;
        }
        return false;
    },

    controllaUtenteGiaRegistrato: (utente) => {
        var UtenteTrovato;
        ModelloUtente.findOne({ email: utente.email }, function(err, result) {
            if (err) {
                console.log("ERRORE", err);
                return;
            }
            if (result) {
                console.log("result", result);
                UtenteTrovato = result;
                return true;
            } else {
                console.log("result", result);
                UtenteTrovato = null;
                return false;
            }
        });

        console.log("UtenteTrovato", UtenteTrovato);
    }
}