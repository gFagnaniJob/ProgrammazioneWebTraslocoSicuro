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

    controlloTraslocatoriInizialiDatabase = async function(traslocatore){

        if (await controllaTraslocatoreGiaRegistrato(traslocatore) === false) {
            
            
                traslocatore.save(function (err) {
                    if (err) {
                        return res.status(404).send();
                    }
            
                });
            }

    }

    module.exports = {controllaTraslocatoreGiaRegistrato, controlloTraslocatoriInizialiDatabase};



