"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySql {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instace || (this._instace = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, result, fields) => {
            if (err) {
                console.log('Erro en query');
                console.log(err);
                return callback(err);
            }
            if (result.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, result);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos online!!');
        });
    }
}
exports.default = MySql;
