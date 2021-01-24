const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { mongoose } =require('./database');

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/client/list',require('./routes/client.routes')); 
//app.use('/',require('./routes/client.routes'));

//Static files
//console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')))


//Starting server
app.listen(app.get('port'), () =>{
    console.log(`server on port ${app.get('port')}`);
});





