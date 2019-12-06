const express=require('express');
const jwt=require('jsonwebtoken');


const app=express();

app.get('/api',(req,res)=>{
    res.json({
        message:'welcom to the API'
    });
});

app.post('/api/posts',verifyToken,(req,res)=>{
   jwt.verify(req.token,'secretkey',(err,authData)=>{
       if(err){
           res.sendStatus(403);
       }else{
        res.json({
            message:'post created...',
            authData
        })
       }
   })   
})

app.post('/api/login',(req,res)=>{
   const user={
       id:1,
       username:'dat',
       email:'dat@chuthanh.com'
   }
  
    jwt.sign({user:user},'secretkey',(err,token)=>{
      res.json({
          message:'dang nhap thanh cong',
          token
      })
    });
})

//Format of Token
//authorization: Bearer<access_token>

//verify TOken

function verifyToken(req,res,next){
    //get auth hearder value
    const beaerHeader=req.headers['authorization'];
    console.log(beaerHeader);
    //check if bearer is underfined
    if(typeof beaerHeader!=='undefined'){
        //split at the space
        const bearer =beaerHeader.split(' '); 
    //get goken from array
    const bearerToken=bearer[1];
    //set the token
    req.token=bearerToken;
    //Next miidleware
    next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(3000,()=>console.log("port is running on port 3000"));