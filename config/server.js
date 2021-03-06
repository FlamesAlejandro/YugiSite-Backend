const express = require('express');
const cors = require('cors');
const authRoutes = require('../app/routes/authRoutes');
const db = require ('./db/connection');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';
        
        // Api Path
        this.authPath = '/api/auth';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.authPath, authRoutes);
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;