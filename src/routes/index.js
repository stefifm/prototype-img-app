const { Router } = require('express');
const router = Router();
const { unlink } = require('fs-extra');
const path = require('path');

const Image = require('../models/image');

// Main page

router.get('/', async (req, res) => {
    const images = await Image.find();
    res.render('index', { images });
});


// Upload page

router.get('/upload', (req, res) => {
    res.render('upload');
});

// Add an image
router.post('/upload', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/')
});

// View Profile 
router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const img = await Image.findById(id);
    console.log(img);
    res.render('profile', { img });
});


// Delete image
router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./src/public' + image.path));
    res.redirect('/');
});

module.exports = router;