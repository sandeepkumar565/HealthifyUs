const mongoose = require('mongoose');
const validator= require('validator');

const characteristicSchema = new mongoose.Schema({
    communicable: {
        type: Boolean
    },
    curable: {
        type: Boolean
    },
    hospitalized: {
        type: Boolean
    },
    symptoms: {
        type: String,
        trim: true
    }
});

const diseaseSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: (val)=>{
            if(val.length<2)
                throw new Error('Invalid disease name!');
        }
    },
    period: {
        type: Date,
        validate: (val)=>{
            if(val<new Date('01-01-1970') || val>new Date())
                throw new Error('Invalid Date!')
        }
    },
    characteristic: {
        type: characteristicSchema
    }
});

const Disease= mongoose.model('Disease', diseaseSchema);
const data={
    "name": "Covid-19",
    "period": '2-21-2021',
    "characteristic": {
        "communicable": true,
        "symptoms": "fever high temp"
    }
}
const disease = new Disease(data);
try {
    disease.save();
    console.log("Posted!");
} catch (err) {
    console.log(err);
}

module.exports = Disease