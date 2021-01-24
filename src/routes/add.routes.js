const express = require('express');
const router = express.Router();

const Client = require('../models/client'); //requiere el modelo de cliente que se definio

    router.get('/', async (req,res)=>{
    //res.send('HelloWorld');
       const clients = await Client.find();
        console.log(clients);

        res.json(clients);
    });

    router.get('./:id', async (req,res) => {
        const clientes = await Client.findById(req.params.id);
        res.json(clients);
    
    });

    router.post('/', async (req,res) => {
        const {id, nombre, email, nacimiento, creacion } =req.body;
        const client = new Client({
            id: id,
            nombre: nombre,
            email: email,
            nacimiento: nacimiento,
            creacion: creacion
        });
        await client.save();
        //console.log(cliente);
        //console.log(req.body); //recibe elementos que envia el navegador
        res.json({status: 'Client add sucessfull'});
    });

module.exports = router;