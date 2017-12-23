const router = require('express').Router();
const axios = require('axios');
const Article = require('../models/articles');
const path = require("path");


router.get('/saved', (req, res) => {
  Article
    .find()
    .then(articles => res.json(articles))
    .catch(err => res.json(err));        
});

router.post('/saved', (req, res) => {
  Article
    .create(req.body)
    .then(newarticle => res.json(newarticle))
    .catch(err => res.json(err));
});

router.delete('/saved/:id', (req, res) => {
  Article
    .findById({'_id' : req.params.id})
    .then(article => article.remove())
    .then(() => res.status(200).send('You deleted article with id ' + req.params.id))
    .catch(err => res.json(err));
});

// Define any API routes before this runs
router.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;