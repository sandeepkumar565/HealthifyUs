const express = require('express');
require('./db/mongoose')
require('./models/User')
require('./models/Disease')
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) =>{
    res.send('Welcome');
});

app.listen(port, ()=>console.log('Server is up and running on '+port));