
function controlloData(data){
    var dataInserita = new Date(data);
    var anno = dataInserita.getFullYear();
    var dataAttuale = new Date();
    dataMaggiorenne = dataAttuale.setFullYear(anno-18);

    if(dataInserita > dataMaggiorenne){
        return false;
    }
    return true;
}
exports.controlloData = controlloData;
