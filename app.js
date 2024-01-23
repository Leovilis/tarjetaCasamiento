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
        to: 'lcampos@ddonpedrosrl.com', // Cambia a tu dirección de correo
        subject: 'Confirmación de Asistencia',
        text: `Nombre y Apellido: ${nombre}\nCorreo: ${correo}\nConfirmación: Asistirá al casamiento.`
    };
    // const destinatarios = ['pablopacheco497@gmail.com', 'vialvaceciliaines@gmail.com', 'arroyocecilia62@gmail.com'];

    // Configurar las opciones del correo
    // const mailOptions = {
    //     from: 'leovilis@gmail.com',
    //     to: destinatarios.join(','), // Convierte el array a una cadena separada por comas
    //     subject: 'Confirmación de Asistencia',
    //     text: `Nombre y Apellido: ${nombre}\nCorreo: ${correo}\nConfirmación: Asistirá al casamiento.`
    // };
    // Enviar el correo
    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         return console.error(error);
    //     }
    //     console.log('Correo enviado:', info.response);
    // });

    // Enviar el correo
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.error('Error al enviar el correo:', error.message);
//         res.status(500).send('Error al enviar el correo. Por favor, inténtalo de nuevo.');
//     } else {
//         console.log('Correo enviado:', info.response);
//         res.sendFile(__dirname + '/public/confirmacion.html');
//     }
// });
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error al enviar el correo:', error.message);
        res.status(500).send('Error al enviar el correo. Por favor, inténtalo de nuevo.');
    } else {
        console.log('Correo enviado:', info);
        res.sendFile(__dirname + '/public/confirmacion.html');
    }
});

    // Enviar una respuesta al navegador
    res.sendFile(__dirname + '/public/confirmacion.html');
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
