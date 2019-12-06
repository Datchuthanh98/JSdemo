const express = require("express");
const jwt = require("jsonwebtoken");
var auth = require("./auth");
var verifyToken = auth.verify;
var mongoose = require("mongoose");
var connectdb = require("./database");
var bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");

//getmodel
var User = require("./Model/User");

//connect to db
mongoose.connect(connectdb.database);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to MongoDB");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message: "Home Page"
  });
});

app.get("/register", (req, res) => {
  res.json({
    message: "Register Page"
  });
});

app.post("/register", (req, res) => {
  var { name, email, phone, password } = req.body;
  //   var errors = req.validationErrors();
  //   if (errors) {
  //     res.json("admin/edit-page", {
  //       message: " register false "
  //     });
  //   } else {
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.json({
        message: "Accound valided"
      });
    } else {
      var user = new User({
        name: name,
        email: email,
        phone: phone,
        password: password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) console.log(err);
          user.password = hash;

          user.save(err => {
            if (err) {
              console.log(err);
            } else {
              res.json({
                message: "thanh cong"
              });
            }
          });
        });
      });
    }
  });
  //   }
});

app.get("/login", (req, res) => {
  res.json({
    message: "Login Page"
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (err) console.log(err);

    if (!user) {
      res.json({ message: "user khong ton tai" });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) console.log(err);

      if (isMatch) {
        jwt.sign({ user: user }, "secretkey", (err, token) => {
          res.json({
            message: "dang nhap thanh cong",
            token
          });
        });
      } else {
        res.json({ message: "mat khau khong chinh xac" });
      }
    });
  });
});

app.post("/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "post created...",
        authData
      });
    }
  });
});

app.get("/change", (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "datchuthanh98@gmail.com",
      pass: "dathazard10"
    }
  });

  var mailOptions = {
    from: "datchuthanh98@gmail.com",
    to: "hoanganhquan29111998@gmail.com",
    subject: "dat dep zai",
    text: "ahihi do ngoc!",
    html: '<a href="http://localhost:3000/changepass"><p>click to here</p></a>'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.json({
    message: "Send Page"
  });
});

app.get("/changepass", (req, res) => {
  res.json({
    message: "page changepassword"
  });
});

app.listen(3000, () => console.log("port is running on port 3000"));
