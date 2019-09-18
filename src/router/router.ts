import {Router, Request, Response} from 'express';
import MySql from '../mysql/mysql';

const router = Router();

router.get('/heroes',(req:Request,res:Response)=> {

    const query = ` SELECT * FROM heroes `;

    MySql.ejecutarQuery(query,(err:any, heroes:Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error:err
            });
        } else {
            res.json({
                ok:true,
                heroes: heroes
            });
        }

    });

});

router.get('/heroe/:id',(req:Request,res:Response) => {

    const id = req.params.id;
    
    const scapedId = MySql.instance.cnn.escape(id);

    const query = ` SELECT * FROM heroes WHERE id = ${scapedId} `;

    MySql.ejecutarQuery(query,(err:any, heroe:Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error:err
            });
        } else {
            res.json({
                ok:true,
                heroe: heroe[0]
            });
        }

    });

});

router.get('/clientes',(req:Request,res:Response) => {
 
    const query = ` SELECT * FROM cliente `;

    MySql.ejecutarQuery(query,(err:any, cliente:Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error:err
            });
        } else {
            res.json({
                ok:true,
                cliente: cliente
            });
        }

    });

});

router.get('/cliente/:id',(req:Request,res:Response) => {

    const id = req.params.id;
    
    const scapedId = MySql.instance.cnn.escape(id);

    const query = ` SELECT * FROM cliente WHERE id_cliente = ${scapedId} `;

    MySql.ejecutarQuery(query,(err:any, cliente:Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error:err
            });
        } else {
            res.json({
                ok:true,
                cliente: cliente[0]
            });
        }

    });

});

router.post('/insertar-cliente', (req:Request,res:Response) => {
    var post  = { 
        nombre: 'Mario',
        apellido: 'Vargas',
        direccion: 'Arequipa, Peru',
        fechaNacimiento: '1936-03-28',
        telefono: '1234567890',
        email: 'mario-varagas@email.com'
    };
    const query = ` INSERT INTO cliente VALUES (null,'${post.nombre}', '${post.apellido}', '${post.direccion}', '${post.fechaNacimiento}', '${post.telefono}', '${post.email}')`;
    MySql.ejecutarQuery(query, (err:any, cliente:any) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error:err
            });
        } else {
            res.json({
                ok:true,
                idCliente: cliente.insertId,
                mensaje:'Registro realizado correctamente'
            });
        }

    });
});

router.get('/productos',(req:Request,res:Response) => {
 
    const query = ` SELECT * FROM producto `;

    MySql.ejecutarQuery(query,(err:any, producto:Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error:err
            });
        } else {
            res.json({
                ok:true,
                producto: producto
            });
        }

    });

});

router.get('/producto/:id',(req:Request,res:Response) => {

    const id = req.params.id;
    
    const scapedId = MySql.instance.cnn.escape(id);

    const query = ` SELECT * FROM producto WHERE id_producto = ${scapedId}`;

    MySql.ejecutarQuery(query,(err:any, producto:Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error:err
            });
        } else {
            res.json({
                ok:true,
                producto: producto[0]
            });
        }

    });

});

router.post('/insertar-producto', (req:Request,res:Response) => {
    var post  = { 
        nombre: 'Durazno',
        precio: '0.10',
        stock: '20'
    };
    const query = ` INSERT INTO producto VALUES(null,'${post.nombre}','${post.precio}','${post.stock}')`;
    MySql.ejecutarQuery(query, (err:any, producto:Object[]) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error:err
            });
        } else {
            res.json({
                ok:true,
                producto: producto,
                mensaje:'Registro realizado correctamente'
            });
        }

    });
});


router.post('/insertar-factura', (req:Request,res:Response) => {

    var maestro  = { 
        id_cliente: '2',
        fecheVenta: '2019-09-18',
        total: '20' // calcular desde frontend para mas facilidad
    };

    const query = ` INSERT INTO factura VALUES (null,'${maestro.id_cliente}','${maestro.fecheVenta}','${maestro.total}')`;
    MySql.ejecutarQuery(query, (err:any, maestro:any) => {

        if (err) {
            res.status(400).json({
                ok: false,
                error:err
            });
        } else {

            res.json({
                ok:true,
                mensaje:'Registro realizado correctamente'
            });
        }

        var detalle = {
            id_factura: maestro.insertId, // aqui obtengo el id de la factura
            id_producto:'1,2,3', // aqui van los detalles en string separados por una coma, que ayudara a separar en arreglos
            cantidad: '3,1,5' // igual aca
        //  precioUni:'5.34,45.6,34' // hacer el calculo en el frontend y solo enviarlo al backend, debido a que el
                                    // precio unitario ya debe mostrarse en el frontend
        }
        
        // aqui reparto los string en arreglos con la ayuda de la funcion split
        var productos = detalle.id_producto.split(',');
        var cantidad = detalle.cantidad.split(',');

        for (let i = 0; i < productos.length; i++) {
            // este ciclo permite registrar los detalles en su respectiva posicion
            const query = ` INSERT INTO detalle_factura VALUES (null,'${detalle.id_factura}','${productos[i]}','${cantidad[i]}')`;
            MySql.ejecutarQuery(query, (err:any, detalle:any) => {
                if (err) {
                    res.status(400).json({
                        ok: false,
                        error:err
                    });
                }
            });
            
        }

        
    });
});



export default router;