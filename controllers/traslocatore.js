const ModelloTraslocatore = require ('../models/traslocatore');

module.exports = {
    controllaTraslocatoreGiaRegistrato: async function (traslocatore) {
        const traslocatoreTrovato = await ModelloTraslocatore.findOne({
            partitaIVA : traslocatore.partitaIVA
        });

        if (traslocatoreTrovato) {
            return true;
        } else {
            return false;
        }
    }
}