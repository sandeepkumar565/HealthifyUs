const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1/health-observer-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});