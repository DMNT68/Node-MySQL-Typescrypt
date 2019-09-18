"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, res) => {
    const query = ` SELECT * FROM heroes `;
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroes: heroes
            });
        }
    });
});
router.get('/heroe/:id', (req, res) => {
    const id = req.params.id;
    const scapedId = mysql_1.default.instance.cnn.escape(id);
    const query = ` SELECT * FROM heroes WHERE id = ${scapedId} `;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                heroe: heroe[0]
            });
        }
    });
});
router.get('/clientes', (req, res) => {
    const query = ` SELECT * FROM cliente `;
    mysql_1.default.ejecutarQuery(query, (err, cliente) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                cliente: cliente
            });
        }
    });
});
router.get('/cliente/:id', (req, res) => {
    const id = req.params.id;
    const scapedId = mysql_1.default.instance.cnn.escape(id);
    const query = ` SELECT * FROM cliente WHERE id_cliente = ${scapedId} `;
    mysql_1.default.ejecutarQuery(query, (err, cliente) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                cliente: cliente[0]
            });
        }
    });
});
router.post('/insertar-cliente', (req, res) => {
    var post = {
        nombre: 'Mario',
        apellido: 'Vargas',
        direccion: 'Arequipa, Peru',
        fechaNacimiento: '1936-03-28',
        telefono: '1234567890',
        email: 'mario-varagas@email.com'
    };
    const query = ` INSERT INTO cliente VALUES (null,'${post.nombre}', '${post.apellido}', '${post.direccion}', '${post.fechaNacimiento}', '${post.telefono}', '${post.email}')`;
    mysql_1.default.ejecutarQuery(query, (err, cliente) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                idCliente: cliente.insertId,
                mensaje: 'Registro realizado correctamente'
            });
        }
    });
});
router.get('/productos', (req, res) => {
    const query = ` SELECT * FROM producto `;
    mysql_1.default.ejecutarQuery(query, (err, producto) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                producto: producto
            });
        }
    });
});
router.get('/producto/:id', (req, res) => {
    const id = req.params.id;
    const scapedId = mysql_1.default.instance.cnn.escape(id);
    const query = ` SELECT * FROM producto WHERE id_producto = ${scapedId}`;
    mysql_1.default.ejecutarQuery(query, (err, producto) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                producto: producto[0]
            });
        }
    });
});
router.post('/insertar-producto', (req, res) => {
    var post = {
        nombre: 'Durazno',
        precio: '0.10',
        stock: '20'
    };
    const query = ` INSERT INTO producto VALUES(null,'${post.nombre}','${post.precio}','${post.stock}')`;
    mysql_1.default.ejecutarQuery(query, (err, producto) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                producto: producto,
                mensaje: 'Registro realizado correctamente'
            });
        }
    });
});
router.post('/insertar-factura', (req, res) => {
    var maestro = {
        id_cliente: '2',
        fecheVenta: '2019-09-18',
        total: '20' // calcular desde frontend para mas facilidad
    };
    const query = ` INSERT INTO factura VALUES (null,'${maestro.id_cliente}','${maestro.fecheVenta}','${maestro.total}')`;
    mysql_1.default.ejecutarQuery(query, (err, maestro) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json({
                ok: true,
                mensaje: 'Registro realizado correctamente'
            });
        }
        var detalle = {
            id_factura: maestro.insertId,
            id_producto: '1,2,3',
            cantidad: '3,1,5' // igual aca
            //  precioUni:'5.34,45.6,34' // hacer el calculo en el frontend y solo enviarlo al backend, debido a que el
            // precio unitario ya debe mostrarse en el frontend
        };
        // aqui reparto los string en arreglos con la ayuda de la funcion split
        var productos = detalle.id_producto.split(',');
        var cantidad = detalle.cantidad.split(',');
        for (let i = 0; i < productos.length; i++) {
            // este ciclo permite registrar los detalles en su respectiva posicion
            const query = ` INSERT INTO detalle_factura VALUES (null,'${detalle.id_factura}','${productos[i]}','${cantidad[i]}')`;
            mysql_1.default.ejecutarQuery(query, (err, detalle) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        error: err
                    });
                }
            });
        }
    });
});
exports.default = router;
