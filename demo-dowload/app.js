
const express = require('express'); // import express js library
const app = express(); //create express js instance 
const path = require('path');
 
// define a route to download a file 
app.get('/dow',(req, res) => {
  var fileLocation = path.join('./image.jpg');
  console.log(fileLocation);
  res.download(fileLocation); 
});

app.get('/',(req, res) => {
   res.json({
       message:"hello kitty"
   })
  });
 
app.listen(8000,() => {
  console.log(`application is running at: http://localhost:8000`);
});