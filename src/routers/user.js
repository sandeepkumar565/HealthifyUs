const express= require('express');
const User = require('../models/User');

const router=express.Router();

router.post('/user', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send();
    } catch(err) {
        res.status(400).send();
    }
});

router.get('/users', async (req, res) => {
    const users=await User.find();
    try {
        res.status(200).send(users);
    } catch(err) {
        res.status(400).send('Welcome');
    }
});

router.patch('/user:id', async (req, res)=>{
    const wantedUpdates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age', 'healthy'];
    const validUpdate=wantedUpdates.every((item)=>{
        return allowedUpdates.includes(item);
    });
    if(!validUpdate)
        res.status(400).send('Invalid');
    try {
        // const user = await User.findByIdAndUpdate(req.params.id.replace(':', ''), req.body, { new: true, runValidators: true });
        const user = await User.findById(req.params.id.replace(':', ''));
        wantedUpdates.forEach((item)=>{
            user[item]=req.body[item];
        });
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send('Error');
    }
});

router.delete('/user:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id.replace(':', ''));
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send();
    }
});

module.exports = router