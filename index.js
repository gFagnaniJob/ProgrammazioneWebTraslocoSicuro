var express = require("express");
var bodyParser = require("body-parser");
const server = express(); //chiamata al server
const porta = 2000; //la porta
const path = require('path');
var userController = require("./controllers/user.js");
const UserModel = require('./models/user');
const dotenv = require('dotenv');
dotenv.config();
const postino = require('./controllers/postino');
const nodemailer = require('nodemailer'); 

const mongoose = require('mongoose');

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







server.listen(porta, function () { //inserisco cosa fa il server quando lo richiamo
    console.log("server in ascolto sulla porta " + porta);

});


server.get("/", function (req, res) {
    res.render('home');
});

server.get("/chiSiamo", function (req, res) {
    res.render('chiSiamo', {classiColonna: "", classiBottone: ""});
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

server.get("/paginaPersonale", function (req, res) {
    res.render('paginaPersonale');
});

server.get('/registrati', function (req, res) {
    res.render('registrati',
        {
            messaggioErrore: "",
            bootstrapClasses: ""
        });
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

    if (!userController.controllaPasswordCoincidenti(User.password, User.confermaPassword)) {
        res.render('registrati',
            {
                messaggioErrore: "Le due password non coincidono",
                bootstrapClasses: "text-left alert alert-danger"
            });
        return;
    }


    if (!userController.controlloData(User.dataNascita)) {
        res.render('registrati',
            {
                messaggioErrore: "Non sei maggiorenne",
                bootstrapClasses: "text-left alert alert-danger"
            });
        return;
    }

<<<<<<< HEAD
    globalUser = User;
    res.redirect('/benvenuto');
=======
    res.render('paginaPersonale', { 
        User,
        classiColonna : "col-sm-2 col-xs-2 col-lg-2 col-md-2 btn-group dropup",
        classiBottone : "btn btn-custom dropdown-toggle",
        
        
    });


>>>>>>> origin

    var newUser = new UserModel(
        {
            nome: User.nome,
            cognome: User.cognome,
            indirizzo: {
                via: User.indirizzo.via,
                provincia: User.indirizzo.provincia,
                stato: User.indirizzo.stato,
                citta: User.indirizzo.citta,
                cap: User.indirizzo.cap,
            },
            dataNascita: User.dataNascita,
            telefono: User.telefono,
            email: User.email,
            password: User.password
        });

    postino.sendMail(postino.creaMailOptions(User), (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', User.email);
    });

    newUser.save(function (err) {
        if (err) console.log(err);//return handleError(err);
    });
    //console.log(User);
});

server.get('/login', function (req, res) {
    res.render('login');
});

server.post('/login/locale', function (req, res) {
    var dati = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(dati);
});

server.get('/benvenuto', function (req, res) {
    res.render('benvenuto', globalUser);
});