
var express = require('express');
var cors = require('cors') 
var app = express(); 
var PORT = 3001;
app.use(cors()); 
  
// Without middleware 
app.get('/debug', function(req, res){ 
    console.log('req.headers.cookie', req.headers.cookie);
}) 
  
app.get('/login', function(req, res){ 
    console.log('login route');
    const token = '*/*--=3432432$%^%$'
    res
        .cookie('rest-auth-cookie', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 100,
            path: '/'
          })
        .status(200)
        .json({message: 'success'})
}); 
  
app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT", PORT); 
}); 