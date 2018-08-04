var express = require("express");
var bodyParser = require("body-parser");
const server = express(); //chiamata al server
const porta = 2000; //la porta
const path = require('path');
var controllersUser = require("./controllers/user.js");

server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.set ('view engine', 'ejs');

server.listen(porta, function () { //inserisco cosa fa il server quando lo richiamo
    console.log("server in ascolto sulla porta " + porta);

});


server.get("/", function (req, res) {
    res.render ('home');
});

server.get("/chiSiamo", function (req, res) {
    res.render('chiSiamo');
});
server.get("/doveSiamo", function (req, res) {
    res.render('doveSiamo');
});
server.get("/comeFunziona", function (req, res) {
    res.render('comeFunziona');
});
server.get("/conChiLavoriamo", function (req, res) {
    res.render('conChiLavoriamo');
});
server.get("/condizioniDiVendita", function (req, res) {
    res.render('condizioniDiVendita');
});
server.get("/contattaci", function (req, res) {
    res.render('contattaci');
});
server.get("/informativaSullaPrivacy", function (req, res) {
    res.render('informativaSullaPrivacy');
});
server.get("/servizi", function (req, res) {
    res.render('servizi');
});

server.get('/registrati', function (req, res) {
    res.render('registrati');
});

server.post('/registrati/locale', function (req, res) {

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
        password: req.body.password,
        confermaPassword: req.body.confermaPassword
    }

    if (User.password !== User.confermaPassword) {
        return console.log(" Le due password inserite non corrispondono ")
    }


    if (controllersUser.controlloData(User.dataNascita) == false) {
        return console.log("non è maggiorenne")
    }

    console.log(User);
});

server.get('/login', function (req, res) {
    res.render('login');
})

server.post('/login/locale', function (req, res) {
    var dati = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(dati);
})