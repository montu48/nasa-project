const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api.js');

const app = express();

app.use(cors({
    origin:'http://localhost:3000'
}));


app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')))
app.use(morgan('combined'));

app.use('/v1',api);



module.exports = app;