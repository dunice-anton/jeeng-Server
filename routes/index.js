var express = require('express');
var router = express.Router();
var tracker = require('../models/tracker');

/* GET home page. */
router.get('/', function(req, res) {
    tracker.getTrackList(function (trackList) {
        res.json(trackList);
    });
//  res.render('index', { title: 'Express' });
});

module.exports = router;
