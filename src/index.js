const express = require('express');
require('./db/mongoose')
const userRouter= require('./routers/user');
const diseaseRouter= require('./routers/disease');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(diseaseRouter);
app.get('/', (req, res) =>{
    res.send('Welcome');
});

app.listen(port, ()=>console.log('Server is up and running on '+port));