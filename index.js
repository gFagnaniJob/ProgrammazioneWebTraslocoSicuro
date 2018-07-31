var express = require("express");
var bodyParser = require("body-parser");
const server = express(); //chiamata al server
const porta = 2000; //la porta
const path = require('path');
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));
server.listen(porta, function () { //inserisco cosa fa il server quando lo richiamo
    console.log("server in ascolto sulla porta " + porta);

});


server.get("/", function (req, res) {

    res.sendFile(path.join(__dirname, '/views', 'home.html'));
});

server.get("/chiSiamo", function (req, res) {

    res.sendFile(path.join(__dirname, '/views', 'chiSiamo.html'));
});
server.get("/doveSiamo", function (req, res) {

    res.sendFile(path.join(__dirname, '/views', 'doveSiamo.html'));
});
server.get("/comeFunziona", function (req, res) {

    res.sendFile(path.join(__dirname, '/views', 'comeFunziona.html'));
});
server.get("/conChiLavoriamo", function (req, res) {

    res.sendFile(path.join(__dirname, '/views', 'conChiLavoriamo.html'));
});
server.get("/condizioniDiVendita", function (req, res) {

    res.sendFile(path.join(__dirname, '/views', 'condizioniDiVendita.html'));
});
server.get("/contattaci", function (req, res) {

    res.sendFile(path.join(__dirname, '/views', 'contattaci.html'));
});
server.get("/informativaSullaPrivacy", function (req, res) {

    res.sendFile(path.join(__dirname, '/views', 'informativaSullaPrivacy.html'));
});
server.get("/servizi", function (req, res) {

    res.sendFile(path.join(__dirname, '/views', 'servizi.html'));
});

server.get('/registrati', function (req, res) {
    res.sendFile(path.join(__dirname, '/views', 'registrati.html'));
});

server.post('/registrati/locale', function(req, res) {
    var User = {
        nome: req.body.nome,
        cognome: req.body.cognome,
        dataNascita: req.body.dataNascita,
        indirizzo: {
            via: req.body.via,
            stato: req.body.stato,
            citta: req.body.citta,
            provincia: req.body.provincia,
            cap: req.body.cap
        },
        telefono: req.body.telefono,
        email: req.body.email,
        password: req.body.password
    }

    console.log(User);
})