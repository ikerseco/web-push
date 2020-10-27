const express = require('express');
const http = require('http')

const port = process.env.PORT || 3006;
const app = express();
const server = http.createServer(app);
const bodyParser = require('body-parser')

const router = require('./routes/routes');

   
//app.use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.use(router)



//smg//
server.listen(port, () => {
    console.log(`Servidor up en http://localhost:${port}`);
});    





   
 
