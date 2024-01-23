const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/confirmacion', (req, res) => {
    const { nombre, correo } = req.body;

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'leovilis@gmail.com',
            pass: 'ysafzypvvobfgbez'
        }
    });

    // Configurar las opciones del correo
    const mailOptions = {
        from: 'leovilis@gmail.com',
        to: 'vialvaceciliaines@gmail.com, leovilis@gmail.com', // Cambia a tu dirección de correo
        subject: 'Confirmación de Asistencia',
        text: `Nombre y Apellido: ${nombre}\nCorreo: ${correo}\nConfirmación: Asistirá al casamiento.`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log('Correo enviado:', info.response);
    });

    // Enviar una respuesta al navegador
    res.sendFile(__dirname + '/public/confirmacion.html');
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
