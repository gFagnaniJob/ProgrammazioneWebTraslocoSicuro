const ModelsTraslocatore = require('../models/traslocatore');
const ModelloTraslocatore = ModelsTraslocatore.modelloTraslocatore;



controllaTraslocatoreGiaRegistrato = async function (traslocatore) {
    const traslocatoreTrovato = await ModelloTraslocatore.findOne({
        partitaIVA: traslocatore.partitaIVA
    });

    if (traslocatoreTrovato) {
        return true;
    } else {

        return false;
    }
}

controlloTraslocatoriInizialiDatabase = async function (listaTraslocatori) {


    for (var i = 0; i < listaTraslocatori.length; i++) {

        if (await controllaTraslocatoreGiaRegistrato(listaTraslocatori[i]) === false) {
            console.log(listaTraslocatori[i].nomeAzienda + " salvato correttamente");
            listaTraslocatori[i].save(function (err) {
                if (err) {
                    console.log("ERRORE DEL TIPO ", err);
                    //return res.status(355).send();
                }

            });
        } else {
            console.log(listaTraslocatori[i].nomeAzienda + " ERRORE");
        }

    }

}



module.exports = { controllaTraslocatoreGiaRegistrato, controlloTraslocatoriInizialiDatabase };



