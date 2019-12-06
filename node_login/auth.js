const jwt=require('jsonwebtoken');

exports.verify=(req,res,next)=>{
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
         console.log('truy cap thai bai vi chua dang nhap')
    }
}
