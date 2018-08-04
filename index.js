var express = require("express");
var bodyParser = require("body-parser");
const server = express(); //chiamata al server
const porta = 2000; //la porta
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));


var utentiSchema = new Schema({
    nome: { type: String, required: true, max: 100 },
    cognome: { type: String, required: true, max: 100 },

    /*
        via: { type: String, required: true, max: 100 },
        provincia: { type: String, required: true, max: 150 },
        stato: { type: String, required: true, max: 150 },
        citta: { type: String, required: true, max: 150 },
        cap: { type: String, required: true, max: 10 },
    */

    indirizzo: {
        via: { type: String },
        provincia: { type: String },
        stato: { type: String },
        citta: { type: String },
        cap: { type: String }
    },
    dataNascita: { type: Date, required: false },
    telefono: { type: String, required: true, max: 100 },
    email: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },

});



var mongoDB = 'mongodb://127.0.0.1/traslocosicuro';
var modelloUtenti = mongoose.model('utenti', utentiSchema);

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));







server.listen(porta, function() { //inserisco cosa fa il server quando lo richiamo
    console.log("server in ascolto sulla porta " + porta);

});


server.get("/", function(req, res) {

    res.sendFile(path.join(__dirname, '/views', 'home.html'));
});

server.get("/chiSiamo", function(req, res) {

    res.sendFile(path.join(__dirname, '/views', 'chiSiamo.html'));
});
server.get("/doveSiamo", function(req, res) {

    res.sendFile(path.join(__dirname, '/views', 'doveSiamo.html'));
});
server.get("/comeFunziona", function(req, res) {

    res.sendFile(path.join(__dirname, '/views', 'comeFunziona.html'));
});
server.get("/conChiLavoriamo", function(req, res) {

    res.sendFile(path.join(__dirname, '/views', 'conChiLavoriamo.html'));
});
server.get("/condizioniDiVendita", function(req, res) {

    res.sendFile(path.join(__dirname, '/views', 'condizioniDiVendita.html'));
});
server.get("/contattaci", function(req, res) {

    res.sendFile(path.join(__dirname, '/views', 'contattaci.html'));
});
server.get("/informativaSullaPrivacy", function(req, res) {

    res.sendFile(path.join(__dirname, '/views', 'informativaSullaPrivacy.html'));
});
server.get("/servizi", function(req, res) {

    res.sendFile(path.join(__dirname, '/views', 'servizi.html'));
});

server.get('/registrati', function(req, res) {
    res.sendFile(path.join(__dirname, '/views', 'registrati.html'));
});

var controllersUser = require("./controllers/user.js");

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
        password: req.body.password,
        confermaPassword: req.body.confermaPassword
    }


    var newUser = new modelloUtenti({ nome: req.body.nome, cognome: req.body.cognome, email: req.body.email, password: req.body.password, provincia: req.body.provincia, stato: req.body.stato, citta: req.body.citta, cap: req.body.cap, dataNascita: req.body.dataNascita, telefono: req.body.telefono, via: req.body.via });
    newUser.save(function(err) {
        if (err) return handleError(err);

    });



    if (User.password !== User.confermaPassword) {
        return console.log(" Le due password inserite non corrispondono ")
    }


    if (controllersUser.controlloData(User.dataNascita) === false) {
        return console.log("non è maggiorenne")
    }



    console.log(User);


});

server.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

server.post('/login/locale', function(req, res) {
    var dati = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(dati);
})