const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PW
    }
});

transporter.creaMailOptions = function(destinatario) {
    return {
        from: '"Trasloco Sicuro"', // sender address
        to: destinatario.email, // list of receivers
        subject: 'Completazione Registrata', // Subject line
        text: 'CIAO PEPPE STO FACENDO DELLE PROVEBenvenuto su Trasloco Sicuro. La sua registrazione è andata a buon fine :)', // plain text body
        html: '<h1>CIAO PEPPE STO FACENDO DELLE PROVEBenvenuto su Trasloco Sicuro</h1><p>La sua registrazione è andata a buon fine :)</p>' // html body
    }
}


module.exports = transporter;

