const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer'); //FIREBASE
const serviceAccount = require('./serviceAccountKey.json'); //FIREBASE
const admin = require('firebase-admin'); //FIREBASE
const io = require('socket.io')(server);
const ordersDeliverySocket = require('./sockets/orders_delivery_socket');
const mercadoPago = require('mercadopago');

mercadoPago.configure({
    access_token: 'TEST-1746538575583249-030921-e361b75132558389a6324d3c80786fd4-1279555925'
});

//*******FIREBASE*******
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount) //Inicializamos NodeJS con Firebase
});


const upload = multer({
    storage: multer.memoryStorage() //Almacenamiento temporal hasta que se suba a Firebase
});


//*******RUTAS*******
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');
const orders = require('./routes/ordersRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');



const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// console.log('PASSPORT', passport);

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

/*
* LLAMANDO A LA RUTAS
*/
users(app, upload);
categories(app, upload);
address(app);
orders(app);
mercadoPagoRoutes(app);
products(app, upload);

/*
* LLAMAR A LOS SOCKETS
*/
ordersDeliverySocket(io);

server.listen(3000, '192.168.100.78' || 'localhost', function() {
    console.log('Back Farmacia con puerto: ' + port + ' ----Iniciada...')
});

/*
server.listen(port, function() {
    console.log('Listening on port ' + port )
});
*/
// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}

// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR