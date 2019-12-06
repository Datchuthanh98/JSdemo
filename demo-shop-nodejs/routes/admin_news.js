var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var isAdmin = auth.isAdmin;
///get new-model
var New = require('../models/new');

//get new-index
router.get('/', isAdmin, function (req, res) {
    New.find({}).sort({ sorting: 1 }).exec(function (err, news) {
        res.render('admin/news', {
            news: news
        })
    })
})

//get add-new
router.get('/add-new', isAdmin, function (req, res) {
    var title = "";
    var total = "";
    var totalimg = "";
    var content = "";

    res.render('admin/add-new', {
        title: title,
        total: total,
        totalimg:totalimg,
        content: content

    })
})


//post add-new
router.post('/add-new', function (req, res) {
    req.checkBody('title', 'Title mus have a value').notEmpty();
    req.checkBody('content', 'Content mus have a value').notEmpty();
    req.checkBody('total', 'Content mus have a value').notEmpty();
    req.checkBody('totalimg', 'Content mus have a value').notEmpty();
    var title = req.body.title;
    var total = req.body.total;
    var totalimg = req.body.totalimg;
    var content = req.body.content;
    var errors = req.validationErrors();
    if (errors) {
        res.render('admin/add-new', {
            errors: errors,
            title: title,
            total: total,
            totalimg: totalimg,
            content: content
        });
    } else {
        New.findOne({ title: title }, function (err, result) {
            if (result) {
                req.flash('danger', 'new title exists, choose another.');
                res.render('admin/add-new', {
                    title: title,
                    total: total,
                    totalimg:totalimg,
                    content: content
                });
            } else {
                var Neww = new New({
                    title: title,
                    total: total,
                    totalimg:totalimg,
                    content: content,
                    sorting: 100
                });

                Neww.save(function (err) {
                    if (err)
                        return console.log(err);
                    New.find({}).sort({ sorting: 1 }).exec(function (err, news) {
                        if (err) {
                            console.log(err);
                        } else {
                            req.app.locals.news = news;
                        }
                    });

                    req.flash('success', 'A New was added!');
                    res.redirect('/admin/news');
                });
            }
        });
    }

});

//get edit-new
router.get('/edit-new/:id', isAdmin, function (req, res) {
    New.findById(req.params.id, function (err, result) {

        if (err)
            return console.log(err);
        res.render('admin/edit-new', {
            title: result.title,
            total: result.total,
            totalimg:result.totalimg,
            content: result.content,
            id: result._id
        })
    })
})


//post edit-new
router.post('/edit-new/:id', function (req, res) {
    req.checkBody('title', 'Title must have a value.').notEmpty();
    req.checkBody('content', 'Content must have a value.').notEmpty();
    req.checkBody('total', 'Total must have a value.').notEmpty();
    req.checkBody('totalimg', 'Total image must have a value.').notEmpty();
    var title = req.body.title;
    var total = req.body.total;
    var totalimg = req.body.totalimg;
    var content = req.body.content;
    var id = req.params.id;
    var errors = req.validationErrors();

    if (errors) {
        res.render('admin/edit-new', {
            errors: errors,
            title: title,
            total: total,
            totalimg:totalimg,
            content: content,
            id: id
        });
    } else {
        New.findOne({ title: title, _id: { '$dat': id } }, function (err, result) {
            if (result) {
                req.flash('danger', 'new slug exists, choose another.');
                res.render('admin/edit-new', {
                    title: title,
                    total: total,
                    totalimg:totalimg,
                    content: content,
                    id: id
                });
            } else {
                New.findById(id, function (err, result) {
                    if (err)
                        return console.log(err);
                    result.title = title;
                    result.total = total;
                    result.totalimg=totalimg;
                    result.content = content;
                    result.save(function (err) {
                        if (err)
                            return console.log(err);
                        req.flash('success', 'This new was edited!');
                        res.redirect('/admin/news');
                    });
                });
            }
        });
    }
});


//get new-delete
router.get('/delete-new/:id', isAdmin, function (req, res) {
    New.findByIdAndRemove(req.params.id, function (err) {
        if (err)
            return console.log(err);
        New.find({}).sort({ sorting: 1 }).exec(function (err, news) {
            if (err) {
                console.log(err);
            } else {
                req.app.locals.news = news;
            }
        });

        req.flash('success', 'New deleted!');
        res.redirect('/admin/news/');
    });
});
//export
module.exports = router;

