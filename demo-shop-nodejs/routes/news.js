var express = require('express');
var router = express.Router();

// Get new model
var New = require('../models/new');

router.get('/', function (req, res) {

    New.findOne({}, function (err, result) {
        if (err)
            console.log(err);

        if (!result) {
            res.redirect('/');
        } else {
            // console.log(result)
            res.render('all_news', {
                title: result.title,
                total: result.total,
                totalimg: result.totalimg,
                content: result.content
            });
        }
    });
});


/*
 * GET a new
 */
router.get('/:title', function (req, res) {

    var title = req.params.title;

    New.findOne({ title: title }, function (err, result) {
        if (err)
            console.log(err);

        if (!result) {
            res.redirect('/');
        } else {
            res.render('neww', {
                title: result.title,
                total: result.total,
                totalimg: result.totalimg,
                content: result.content
            });
        }
    });
});

// Exports
module.exports = router;


