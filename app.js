const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./config/database')
const router = express.Router();

const routes=require('./routes/index');
const PORT=process.env.PORT;

const app = express();
app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/masters',routes(router))

sequelize.sync().then(result=>{
    app.listen(PORT);
}).catch(err=>{
    console.log(err)
})