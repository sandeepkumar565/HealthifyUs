const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: (val)=>{
            if(val.length<2)
                throw new Error('Invalid name!');
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: (val)=>{
            if(!validator.isEmail(val))
                throw new Error('Invalid email');
        }
    },
    password: {
        type: String,
        required: true,
        validate: (val)=>{
            const regexp=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
            if(!regexp.test(val)) 
                throw new Error('Invalid password!')
        }
    },
    age: {
        type: Number
    },
    healthy: {
        type: Boolean
    }
});

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})

const User = mongoose.model('User', userSchema);

module.exports=User;