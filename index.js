var express = require("express");
var index = express();
var session = require('express-session');
var bodyParser = require("body-parser");
const server = express(); //chiamata al server
const porta = 2000; //la porta
const path = require('path');

var router = express.Router();
var userController = require("./controllers/user.js");
const modelUser = require('./models/user');
const utentiSchema = modelUser.utentiSchema;
const modelloUtenti = modelUser.modelloUtenti;
const dotenv = require('dotenv');
dotenv.config();
const postino = require('./controllers/postino');
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
var globalUser;

var bcrypt = require('bcrypt');
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.set('view engine', 'ejs');

var mongoDB = 'mongodb://127.0.0.1/traslocosicuro';

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({
    extended: true
}));




index.use(session({
    secret: 'pinkie pie',
    resave: true,
    saveUninitialized: true,
    //store: new MongoStore({
    //  mongooseConnection: db
    //})
}));


server.listen(porta, function() { //inserisco cosa fa il server quando lo richiamo
    console.log("server in ascolto sulla porta " + porta);





});

server.get("/", function(req, res) {
    res.render('home');
});

server.get("/chiSiamo", function(req, res) {
    if (session) {
        return res.render('prenotazione');
    } else {
        return res.send('<h1>Devi essere loggato per vedere questa questa pagina </h1>')
    }
});

server.get("/doveSiamo", function(req, res) {
    if (session) {
        res.render('doveSiamo');
    } else {
        res.render('home');
    }

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

server.get('/login', function(req, res) {

    res.render('login');

});

server.get('/benvenuto', function(req, res) {
    res.render('benvenuto', globalUser);
});

server.get("/paginaPersonale", function(req, res) {
    res.render('paginaPersonale');
});

server.get('/registrati', function(req, res) {
    res.render('registrati', {
        messaggioErrore: "",
        bootstrapClasses: ""
    });
});

server.get("/prenotazione", function(req, res) {
    res.render('prenotazione', globalUser);
});

server.post("/prenotazione/locale", function(req, res) {
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
        infoAbitazione: {
            stanze: req.body.stanza
        },
        serviziAggiuntivi: {
            imballaggio: req.body.imballaggio,
            smontaggioRimontaggio: req.body.smontaggioRiassemblaggio,
            depositoMerci: req.body.depositoMerci,
        },
    }
    console.log(DatiPrenotazione);
});


server.post('/registrati/locale', async function(req, res) { //INIZIO REGISTRATI LOCALE

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



    var newUser = new modelloUtenti({
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
    globalUser = newUser;


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

    newUser.save(function(err) {
        if (err) return res.status(404).send();
    });

    res.redirect('/prenotazione');



}); //FINE REGISTRATI LOCALE




server.get('/logout', function(req, res, next) {
    if (session) {
        // delete session objecT
        console.log("sessione eliminata = " + session);
        session = null;
        res.render('home');
    }

    console.log("Logout effettuato");
});


/*    TODO:---> DA VERIFICARE MEGLIO IL FUNZIONAMENTO DI NEXT()
function verificaAutenticazione(req, res, next) {
    if (session) {
        return next();
    } else {
        var err = new Error('DEVI ESSERE LOGGATO PER VEDERE QUESTI CONTENUTI 8)');
        err.status = 401;
        return next(err);
    }
}
*/

server.post('/login/locale', function(req, res) {

    var email = req.body.email;
    var password = req.body.password;


    var datiUtente = {
        email: req.body.email,
        password: req.body.password
    }

    modelloUtenti.findOne({ email: email, }, function(err, user) {
        if (err) {
            console.log("err1");
            return res.status(500).send();
        }

        if (!user) {
            console.log("err2");
            return res.status(520).send();
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if (result === false) {
                console.log("password errata")
                return res.redirect('/registrati');
            } else {
                console.log("Login Effettuato");

                session = email;
                res.render('prenotazione');
                console.log("ciao " + user.nome + " " + user.cognome);
            }
        })
    });
});




var Utente = mongoose.model('Utente', utentiSchema);
module.exports = Utente;