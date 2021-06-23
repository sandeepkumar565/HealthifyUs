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
    characteristics: {
        type: characteristicSchema
    }
});

const Disease= mongoose.model('Disease', diseaseSchema);
const data={
    "name": "AIDS",
    "period": "12-16-20",
    "password": "Sandy@#$123"
}
/*const disease = new Disease(data);
try {
    const d=new Date(), p=data.period.split('-');
    d.setMonth(+p[0]-1);
    d.setDate(+p[1]);
    d.setFullYear(+p[2]+2000)
    disease.period=new Date(d);
    disease.save();
    console.log("Disease saved!");
} catch (err) {
    console.log(err)
}*/
module.exports = Disease