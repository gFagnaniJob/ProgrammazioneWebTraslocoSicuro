const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var utentiSchema = new Schema({
    nome: { type: String, max: 100 },
    cognome: { type: String, max: 100 },

    /*
        via: { type: String, required: true, max: 100 },
        provincia: { type: String, required: true, max: 150 },
        stato: { type: String, required: true, max: 150 },
        citta: { type: String, required: true, max: 150 },
        cap: { type: String, required: true, max: 10 },
    */

    indirizzo: {
        via: { type: String},
        provincia: { type: String },
        stato: { type: String },
        citta: { type: String },
        cap: { type: String } 
    },
    dataNascita: { type: Date },
    telefono: { type: String, max: 100 },
    email: { type: String, max: 100 },
    password: { type: String, max: 100 },

});

//prima di salvare i dati nel database crypto la password
utentiSchema.pre('save', function(next) {
    var newUser = this;
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        newUser.password = hash;
        next();
    })
});

utentiSchema.methods.controllaPassword = function (passwordImmessa) {
   //TODO
   //controllaPassword dovrebbe verificare che la passwordImmessa e la password nel db (hashata) siano uguali
}


var modelloUtenti = mongoose.model('utenti', utentiSchema);

module.exports = modelloUtenti;