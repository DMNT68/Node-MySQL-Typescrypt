import mysql = require('mysql');

export default class MySql {

    private static _instace: MySql;

    cnn: mysql.Connection;
    conectado:boolean = false;

    constructor() {
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });

        this.conectarDB();
    }

    public static get instance() {
        return this._instace || (this._instace = new this())
    }

    static ejecutarQuery( query: string, callback: Function ) {
        this.instance.cnn.query(query,( err, result:Object[], fields )=>{

            if (err) {
                console.log('Erro en query');
                console.log(err);
                return callback(err)
            }

            if (result.length === 0) {
                callback('El registro solicitado no existe');
            } else {
                callback(null, result);
            }


        });
    }

    private conectarDB(){
        this.cnn.connect((err:mysql.MysqlError) => {
            if(err){
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('Base de datos online!!');
        });
    }

}