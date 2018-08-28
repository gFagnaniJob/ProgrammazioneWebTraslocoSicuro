var express = require("express");
var index = express();
var session = require('express-session');
var bodyParser = require("body-parser");
const server = express(); //chiamata al server
const porta = 2000; //la porta
const path = require('path');
const modelsTraslocatori = require("./models/traslocatore.js");
const listaTraslocatori = modelsTraslocatori.traslocatori;
const controllersTraslocatori = require("./controllers/traslocatore.js");
const controlloTraslocatoriInizialiDelDatabase = controllersTraslocatori.controlloTraslocatoriInizialiDatabase;

var controllersUser = require("./controllers/user.js");
const modelsUser = require('./models/user');
const modelloUtenti = modelsUser.modelloUtenti;
const utentiSchema = modelsUser.utentiSchema;
const dotenv = require('dotenv').config();
console.log("dotenv", dotenv.parsed);
const postino = require('./controllers/postino');
var MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

var globalUser;

const modelloTraslocatori = require('./models/traslocatore').modelloTraslocatore;

var indirizzoUtente = [];
var indirizziTraslocatori = [];
var indirizzoPartenzaUtente = [];
var indirizzoArrivoUtente = [];

controlloTraslocatoriInizialiDelDatabase(listaTraslocatori);

const googleMapsController = require('./controllers/googleMaps');
var bcrypt = require('bcrypt');
server.use(express.static("public"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
    extended: false
}));

server.set('view engine', 'ejs');

var mongoDB = 'mongodb://127.0.0.1/traslocosicuro';

mongoose.connect(mongoDB, { useNewUrlParser: true });
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
    saveUninitialized: true
    //store: new MongoStore({
    //    mongooseConnection: db
    //})
}));

var loggato = false;

server.listen(porta, async function () { //inserisco cosa fa il server quando lo richiamo
    console.log("server in ascolto sulla porta " + porta);
    session = null;
    indirizziTraslocatori = await inizializzaDestinazioni();
});

server.get("/", function (req, res) {

    if (session) {
        loggato = true;
        return res.render('home', {
            loggato,
        });
    } else {
        loggato = false;
        return res.render('home', {
            loggato,
        });
    }

});

server.get("/chiSiamo", function (req, res) {
    if (session) {
        loggato = true;
        return res.render('chiSiamo', {
            loggato,
        });
    } else {
        loggato = false;
        return res.render('chiSiamo', {
            loggato,
        });
    }
});

server.get("/doveSiamo", function (req, res) {
    if (session) {
        loggato = true;
        return res.render('doveSiamo', {
            loggato,
        });
    } else {
        loggato = false;
        return res.render('doveSiamo', {
            loggato,
        });
    }

});

server.get("/comeFunziona", function (req, res) {
    if (session) {
        loggato = true;
        return res.render('comeFunziona', {
            loggato,
        });
    } else {
        loggato = false;
        return res.render('comeFunziona', {
            loggato,
        });
    }
});

server.get("/conChiLavoriamo", function (req, res) {
    if (session) {
        loggato = true;
        return res.render('conChiLavoriamo', {
            loggato,
        });
    } else {
        loggato = false;
        return res.render('conChiLavoriamo', {
            loggato,
        });
    }
});

server.get("/condizioniDiVendita", function (req, res) {
    if (session) {
        loggato = true;
        return res.render('condizioniDiVendita', {
            loggato,
        });
    } else {
        loggato = false;
        return res.render('condizioniDiVendita', {
            loggato,
        });
    }
});
server.get("/contattaci", function (req, res) {
    if (session) {
        loggato = true;
        return res.render('contattaci', {
            loggato,
        });
    } else {
        loggato = false;
        return res.render('contattaci', {
            loggato,
        });
    }
});
server.get("/informativaSullaPrivacy", function (req, res) {
    if (session) {
        loggato = true;
        return res.render('informativaSullaPrivacy', {
            loggato,
        });
    } else {
        loggato = false;
        return res.render('informativaSullaPrivacy', {
            loggato,
        });
    }
});
server.get("/servizi", function (req, res) {
    if (session) {
        loggato = true;
        return res.render('servizi', {
            loggato,
        });
    } else {
        loggato = false;
        return res.render('servizi', {
            loggato,
        });
    }
});

server.get('/login', checkNotAuthentication, function (req, res) {

    res.render('login', {
        messaggioErrore: "",
        bootstrapClasses: ""
    });

});



server.get("/iMieiAppuntamenti", checkAuthentication, function (req, res) {
    res.render('iMieiAppuntamenti');
});

server.get("/modificaInfo", checkAuthentication, async function (req, res) {

    var utente = await modelloUtenti.findOne({ email: session, });

    var utente = globalUser;
    console.log(utente.nome);
    res.render('modificaInformazioni', {

        datiUtenteNome: utente.nome,
        datiUtenteCognome: utente.cognome,
        datiUtenteTelefono: utente.telefono,
        datiUtenteEmail: utente.email,
        messaggioErrore: "",
        bootstrapClasses: "",

    });

});



server.post("/modificaInformazioni/Locale", checkAuthentication, async function (req, res) {

    utente = globalUser;
    console.log(globalUser);



    if (req.body.nuovaEmail !== "" && req.body.confermaNuovaEmail !== "") {
        if (req.body.nuovaEmail === req.body.confermaNuovaEmail) {
            //salvo l'email nel database
            await modelloUtenti.findOneAndUpdate({ email: utente.email }, { email: req.body.nuovaEmail });
            utente.email = req.body.nuovaEmail;


        }
        else {

            res.render("modificaInformazioni", {
                datiUtenteNome: utente.nome,
                datiUtenteCognome: utente.cognome,
                datiUtenteTelefono: utente.telefono,
                datiUtenteEmail: utente.email,
                messaggioErrore: "le due email inserite non coincidono ",
                bootstrapClasses: "text-left alert alert-danger",

            });
           
        }


    }



    if (req.body.vecchiaPassword !== "" && req.body.nuovaPassword !== "" && req.body.confermaNuovaPassword !== "") {




        bcrypt.compare(req.body.vecchiaPassword, utente.password, async function (err, result) {
            if (result == true) {



                if (req.body.nuovaPassword === req.body.confermaNuovaPassword) {
                    //cripto la password e la salvo nel database

                    var passwordDB = bcrypt.hashSync(req.body.nuovaPassword, 10);


                    await modelloUtenti.findOneAndUpdate({ email: utente.email }, { password: passwordDB });

                }
                else {
                    res.render("modificaInformazioni", {
                        datiUtenteNome: utente.nome,
                        datiUtenteCognome: utente.cognome,
                        datiUtenteTelefono: utente.telefono,
                        datiUtenteEmail: utente.email,
                        messaggioErrore: "le password inserite non coincidono ",
                        bootstrapClasses: "text-left alert alert-danger",
        
                    });
                    
                }


            }

            else {
                res.render("modificaInformazioni", {
                    datiUtenteNome: utente.nome,
                    datiUtenteCognome: utente.cognome,
                    datiUtenteTelefono: utente.telefono,
                    datiUtenteEmail: utente.email,
                    messaggioErrore: " le password inserite non sono valide ",
                    bootstrapClasses: "text-left alert alert-danger",
    
                });
                
            }




        })




    }


    if (req.body.nome != "") {
        await modelloUtenti.findOneAndUpdate({ email: utente.email }, { nome: req.body.nome });
        utente.nome = req.body.nome;
    }


    if (req.body.cognome != "") {
        await modelloUtenti.findOneAndUpdate({ email: utente.email }, { cognome: req.body.cognome });
        utente.cognome = req.body.cognome;
    }


    if (req.body.telefono != "") {
        await modelloUtenti.findOneAndUpdate({ email: utente.email }, { telefono: req.body.telefono });
        utente.telefono = req.body.telefono;
    }

    res.render("modificaInformazioni", {
        datiUtenteNome: utente.nome,
        datiUtenteCognome: utente.cognome,
        datiUtenteTelefono: utente.telefono,
        datiUtenteEmail: utente.email,
        messaggioErrore: "le modifiche sono state apportate",
        bootstrapClasses: "text-left alert alert-info",

    });

});


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\








server.get('/registrati', function (req, res) {
    res.render('registrati', {
        messaggioErrore: "",
        bootstrapClasses: ""
    });
});

server.get("/prenotazione", checkAuthentication, function (req, res) {
    res.render('prenotazione', globalUser);
});

server.post("/prenotazione/locale", checkAuthentication, function (req, res) {
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

server.post('/registrati/locale', checkNotAuthentication, async function (req, res) { //INIZIO REGISTRATI LOCALE

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

    if (!controllersUser.controllaPasswordCoincidenti(User.password, User.confermaPassword)) {
        res.render('registrati', {
            messaggioErrore: "Le due password non coincidono",
            bootstrapClasses: "text-left alert alert-danger"
        });
        return;
    }

    if (!controllersUser.controlloData(User.dataNascita)) {
        res.render('registrati', {
            messaggioErrore: "Non sei maggiorenne",
            bootstrapClasses: "text-left alert alert-danger"
        });
        return;
    }

    if (await controllersUser.controllaUtenteGiaRegistrato(User)) {
        res.render('registrati', {
            messaggioErrore: "Email già Registrata",
            bootstrapClasses: "text-left alert alert-danger"
        });
        return;
    }

    var indirizzoFormattato = User.indirizzo.via + ", " + User.indirizzo.citta + ", " + User.indirizzo.provincia + ", " + User.indirizzo.stato;

    var newUser = new modelloUtenti({
        nome: User.nome.toString().toLowerCase(),
        cognome: User.cognome.toString().toLowerCase(),
        indirizzo: indirizzoFormattato,
        dataNascita: User.dataNascita,
        telefono: User.telefono,
        email: User.email.toString().toLowerCase(),
        password: User.password
    });

    globalUser = newUser;

    indirizzoUtente = [globalUser.indirizzo];

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
        if (err) return res.status(404).send();
    });

    session = User.email;
    loggato = true;
    res.redirect('/prenotazione');

    //CHIUSURA REGISTRATI LOCALE
});

server.get('/logout', checkAuthentication, function (req, res, next) {
    if (session) {
        // delete session objecT
        console.log("sessione eliminata = " + session);
        session = null;
        loggato = false;
        indirizzoUtente = [];
        res.render('home', {
            loggato
        });
    }

    console.log("Logout effettuato");
    return;
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

server.post('/login/locale', checkNotAuthentication, function (req, res) {

    var email = req.body.email;
    var password = req.body.password;


    var datiUtente = {
        email: req.body.email,
        password: req.body.password
    }

    modelloUtenti.findOne({ email: email, }, function (err, user) {
        if (err) {
            console.log("err1");
            return res.status(500).send();
        }

        if (!user) {
            console.log("err2");
            res.render('login', {
                messaggioErrore: "combinazione email e password errata",
                bootstrapClasses: "text-left alert alert-danger"
            });
            return //utente non trovato
        }

        bcrypt.compare(password, user.password, async function (err, result) {

            if (result === false) {

                res.render('login', {
                    messaggioErrore: "combinazione email e password errata",
                    bootstrapClasses: "text-left alert alert-danger"
                });
                console.log("password errata") //password errata

            } else {
                session = email;
                loggato = true;
                globalUser = user;
                indirizzoUtente = [globalUser.indirizzo];
                googleMapsController.getTraslocatorePiuVicino(indirizzoUtente, indirizziTraslocatori, function (traslocatore) {
                    if (!traslocatore) {
                        console.log("ERRORE NESSUN TRASLOCATORE TROVATO");
                    } else {
                        console.log("E' stato selezionato il traslocatore " + traslocatore.nomeAzienda + " con sede in " + traslocatore.indirizzoAzienda);
                        console.log("login effettuato");
                        return res.render('home', { loggato });
                    }
                });

            }
        })

    });
});

var Utente = mongoose.model('Utente', utentiSchema);

async function inizializzaDestinazioni() {
    var traslocatori = await modelloTraslocatori.find({});
    for (i = 0; i < traslocatori.length; i++) {
        var indirizzoTraslocatore = traslocatori[i].indirizzoAzienda;
        indirizziTraslocatori.push(indirizzoTraslocatore);
    }
    return indirizziTraslocatori;
}

function checkAuthentication(req, res, next) {
    if (session) {
        next();
    } else {
        res.redirect('/');
    }
}

function checkNotAuthentication(req, res, next) {
    if (session) {
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = Utente;
