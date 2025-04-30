import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import routerProductos from '../routes/productos.js';

import {dbConnection}  from '../database/config.js'; // importar la conexion a la base de datos desde 'database/conf

export class Server{
    constructor(){
        this.app = express();
        this.paths = {
            // Urls de las rutas
            productos:  '/api',
        }

        // conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

    };

    async conectarDB(){
        await dbConnection();
    }
    
    middlewares(){

        // CORS
        this.app.use(cors());

        // Read and parse body
        this.app.use(express.json());

    }

    routes(){
        this.app.use( this.paths.productos, routerProductos );
    }

    listen(){
        this.app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT }`);
        });
    }
}