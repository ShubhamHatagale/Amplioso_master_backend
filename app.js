const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./config/database')
const router = express.Router();
const helper=require('./config/helpers');


const routes=require('./routes/index');
const PORT=process.env.PORT;

const app = express();

app.use(bodyParser.json()); // application/json

app.use(bodyParser.urlencoded({extended : true}))      

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Alow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/masters',routes(router))
// app.use('assets/images', express.static(path.join(__dirname, 'images')));

sequelize.sync().then(result=>{
    app.listen(PORT);
}).catch(err=>{
    console.log(err)
})
