var express = require("express");
var bodyParser = require("body-parser");
const server = express(); //chiamata al server
const porta = 2000; //la porta
const path = require('path');
var userController = require("./controllers/user.js");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: true
}));

server.set('view engine', 'ejs');


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
    res.render('home');
});

server.get("/chiSiamo", function(req, res) {
    res.render('chiSiamo');
});
server.get("/doveSiamo", function(req, res) {
    res.render('doveSiamo');
});
server.get("/comeFunziona", function(req, res) {
    res.render('comeFunziona');
});
server.get("/conChiLavoriamo", function(req, res) {
    res.render('conChiLavoriamo');
});
server.get("/condizioniDiVendita", function(req, res) {
    res.render('condizioniDiVendita');
});
server.get("/contattaci", function(req, res) {
    res.render('contattaci');
});
server.get("/informativaSullaPrivacy", function(req, res) {
    res.render('informativaSullaPrivacy');
});
server.get("/servizi", function(req, res) {
    res.render('servizi');
});

server.get('/registrati', function(req, res) {
    res.render('registrati', {messaggioErrore: ""});
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
        password: req.body.password,
        confermaPassword: req.body.confermaPassword
    }

    if (!userController.controllaPasswordCoincidenti(User.password, User.confermaPassword)) {
        console.log(" Le due password inserite non corrispondono ");
        res.render('registrati', {messaggioErrore: "Le due password non coincidono"});
        return;
    }


    if (!userController.controlloData(User.dataNascita)) {
        console.log("non è maggiorenne");
        res.render('registrati', {messaggioErrore: "Non sei maggiorenne"});
        return;
    }

    res.render('benvenuto', User);



    var newUser = new modelloUtenti({ nome: req.body.nome, cognome: req.body.cognome,
                                    email: req.body.email, password: req.body.password,
                                    indirizzo: {
                                        provincia: req.body.provincia,
                                        stato: req.body.stato,
                                        citta: req.body.citta,
                                        cap: req.body.cap,
                                        via: req.body.via
                                    },
                                    dataNascita: req.body.dataNascita,
                                    telefono: req.body.telefono, });
    //prima di salvare i dati nel database crypto la password
    utentiSchema.pre('save', function(next) {
        var newUser = this;
        const salt = bcrypt.genSalt(10);
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }
            newUser.password = hash;
            next();
        })
    });
    newUser.save(function(err) {
        if (err) return handleError(err);
    });

    /* TODO: Aggiungere il salt
    userSchema.pre('save', async function (next) {
    try {
        if (this.method !== 'local') {
            next();
        }
        //Generate a salt
        const salt = await bcrypt.genSalt(10);
        //Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.local.password, salt);
        //Re-assign hashed version over original, plain text password
        this.local.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
    });
    */







    console.log(User);
});

server.get('/login', function(req, res) {
    res.render('login');
})

server.post('/login/locale', function(req, res) {
    var dati = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(dati);
})