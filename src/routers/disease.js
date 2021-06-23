const express= require('express');
const Disease = require('../models/Disease');

const router=express.Router();

router.post('/disease', async (req, res) => {
    const disease = new Disease(req.body);
    try {
        await disease.save();
        res.status(201).send();
    } catch(err) {
        res.status(400).send();
    }
});

router.get('/disease', async (req, res) => { 
    const disease = await Disease.find();
    try {
        res.status(200).send(disease);
    } catch(err) {
        res.status(400).send('Welcome');
    }
});

router.patch('/disease:id', async(req, res) => {
    const wantedUpdates = Object.keys(req.body);
    const characteristics=wantedUpdates.characteristics;
    if(characteristics) {
        const allowedCharacteristics=[communicable, curable, hospitalized, symptoms];
        const isValidCharacteristics = characteristics.every((update) => allowedCharacteristics.includes(update));
        if (!isValidCharacteristics)
            return res.status(400).send('Invalid updates')
        wantedUpdates.splice(wantedUpdates.indexOf(characteristics));
    }
    const allowedUpdates = ['name', 'period'];
    const isValidUpdate = wantedUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate)
        return res.status(400).send('Invalid updates')

    try {
        const disease = await Disease.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!disease)
            return res.status(404).send('Disease not found');
        //updates.forEach((update) => disease[update] = req.body[update]);
        await disease.save();
        res.send(disease);
    } catch (err) {
        res.status(400).send(err);
    }
})

router.delete('/disease:id', async(req, res) => {
    try {
        const disease = await Disease.findByIdAndDelete(req.params.id.replace(':', ''));
        res.send(disease);
    } catch (err) {
        res.status(400).send();
    }
})

module.exports = router;