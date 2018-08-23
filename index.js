var express = require("express");
var index = express();
var session = require('express-session');
var bodyParser = require("body-parser");
const server = express(); //chiamata al server
const porta = 2000; //la porta
const path = require('path');
var userController = require("./controllers/user.js");
const UserModel = require('./models/user');
var passport = require("passport");
const dotenv = require('dotenv');
dotenv.config();
const postino = require('./controllers/postino');
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require('mongoose');
var session;
var globalUser;

var bcrypt = require('bcrypt');
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.set('view engine', 'ejs');

var mongoDB = 'mongodb://127.0.0.1/traslocosicuro';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: true }));

//use sessions for tracking logins

index.use(require("express-session")({
    secret: "Hello World, this is a session",
    resave: false,
    saveUninitialized: false
}));

server.listen(porta, function () { //inserisco cosa fa il server quando lo richiamo
    console.log("server in ascolto sulla porta " + porta);

});

server.get("/", function (req, res) {
    res.render('home');
});

server.get("/chiSiamo", function (req, res) {
    res.render('prenotazione', {nome: "prova", cognome: "cognome"});
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

server.get('/login', function (req, res) {

    res.render('login');
});

server.get('/benvenuto', function (req, res) {
    res.render('benvenuto', globalUser);
});

server.get("/paginaPersonale", function (req, res) {
    res.render('paginaPersonale');
});

server.get('/registrati', function (req, res) {
    res.render('registrati', {
        messaggioErrore: "",
        bootstrapClasses: ""
    });
});

server.get("/prenotazione", function (req, res) {
    res.render('prenotazione', globalUser);
});

server.post("/prenotazione/locale", function (req, res) {
    var DatiPrenotazione = {
        indirizzoPartenza: {
            via: req.body.viaPartenza,
            numero: req.body.numeroCivicoPartenza,
            cap: req.body.capPartenza,
            città: req.body.cittàPartenza,
            stato: req.body.statoPartenza,
            piano: req.body.pianoPartenza,
            ascensore: req.body.ascensorePartenza,
        },
        indirizzoArrivo: {
            via: req.body.viaArrivo,
            numero: req.body.numeroCivicoArrivo,
            cap: req.body.capArrivo,
            città: req.body.cittàArrivo,
            stato: req.body.statoArrivo,
            piano: req.body.pianoArrivo,
            ascensore: req.body.ascensorearrivo
        },
        infoAbitazione: { stanze: req.body.stanza },
        serviziAggiuntivi: {
            imballaggio: req.body.imballaggio,
            smontaggioRimontaggio: req.body.smontaggioRiassemblaggio,
            depositoMerci: req.body.depositoMerci,
        },
    }
    console.log(DatiPrenotazione);
});

server.post('/registrati/locale', async function (req, res) { //INIZIO REGISTRATI LOCALE
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

    if (!userController.controllaPasswordCoincidenti(User.password, User.confermaPassword)) {
        res.render('registrati', {
            messaggioErrore: "Le due password non coincidono",
            bootstrapClasses: "text-left alert alert-danger"
        });
        return;
    }

    if (!userController.controlloData(User.dataNascita)) {
        res.render('registrati', {
            messaggioErrore: "Non sei maggiorenne",
            bootstrapClasses: "text-left alert alert-danger"
        });
        return;
    }

    if (await userController.controllaUtenteGiaRegistrato(User)) {
        res.render('registrati', {
            messaggioErrore: "Email già Registrata",
            bootstrapClasses: "text-left alert alert-danger"
        });
        return;
    }

    globalUser = User;

    var newUser = new UserModel({
        nome: User.nome.toString().toLowerCase(),
        cognome: User.cognome.toString().toLowerCase(),
        indirizzo: {
            via: User.indirizzo.via.toString().toLowerCase(),
            provincia: User.indirizzo.provincia.toString().toLowerCase(),
            stato: User.indirizzo.stato.toString().toLowerCase(),
            citta: User.indirizzo.citta.toString().toLowerCase(),
            cap: User.indirizzo.cap.toString().toLowerCase(),
        },
        dataNascita: User.dataNascita,
        telefono: User.telefono,
        email: User.email.toString().toLowerCase(),
        password: User.password
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Trasloco Sicuro"', // sender address
        to: User.email, // list of receivers
        subject: 'Registrazione Completata', // Subject line
        text: 'Benvenuto su Trasloco Sicuro. La sua registrazione è andata a buon fine 🙂', // plain text body
        html: '<h1>Benvenuto su Trasloco Sicuro</h1><p>La sua registrazione è andata a buon fine :)</p>' // html body
    };

    postino.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', User.email);
    });

    newUser.save(function (err) {
        if (err) console.log(err); //return handleError(err);
    });

    res.redirect('/prenotazione');

    //console.log(User);
    //CHIUSURA REGISTRATI LOCALE
});

server.post('/login/locale', function (req, res) {
    var dati = {
        email: req.body.email,
        password: req.body.password
    }

    if (req.body.email == "admin@admin.it" && req.body.password == "admin") {
        session.id = "admin00101";
        res.render('home');
        console.log(session.id);
    }
    console.log(dati);
});