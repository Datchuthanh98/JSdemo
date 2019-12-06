var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var fileUpload = require('express-fileupload');
var passport = require('passport');

//connect to db 
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected to MongoDB');
});

//init app
var app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//set global error variable
app.locals.errors = null;

//get new model
var New = require('./models/new');

// all news to pass header.ejs
New.find({}).sort({ sorting: 1 }).exec(function (err, news) {
    if (err) {
        console.log(err);

    } else {
        app.locals.news = news;
    }
})


//get category model
var Category = require('./models/category');

// all category to pass header.ejs
Category.find({}).sort({ sorting: 1 }).exec(function (err, categories) {
    if (err) {
        console.log(err);

    } else {
        app.locals.categories = categories;
    }
})


//express fileUpload middleware
app.use(fileUpload());

//body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//express-session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

// Express Validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case ".jpg":
                    return ".jpg";
                case ".jpeg":
                    return ".jpeg";
                case ".png":
                    return ".png";
                case "":
                    return ".jpg";
                default:
                    return false
            }
        }
    }
}))

//express-message middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Passport Config
require('./config/passport')(passport);
require('./config/passportfb')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
    res.locals.cart = req.session.cart;
    res.locals.user = req.user || null;
    next();
});


// Set routes 
var news = require('./routes/news.js');
var products = require('./routes/products.js');
var cart = require('./routes/cart.js');
var users = require('./routes/users.js');
var adminNews = require('./routes/admin_news.js');
var adminCategories = require('./routes/admin_categories.js');
var adminProducts = require('./routes/admin_products.js');

app.use('/admin/news', adminNews);
app.use('/admin/categories', adminCategories);
app.use('/admin/products', adminProducts);
app.use('/products', products);
app.use('/news', news);
app.use('/cart', cart);
app.use('/users', users);``



//start the sever
app.listen(process.env.PORT || 3000);

