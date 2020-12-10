const express = require('express');
const http = require('http')


//app router
const port = process.env.PORT || 8000;
const app = express();
const bodyParser = require('body-parser')
const router = require('./routes/routes');

//http web server
const server = http.createServer(app);
const fs = require('fs');
const path = require('path')

//mongosee
const mongoose = require('mongoose');
const mongodbRoute = 'mongodb+srv://webpush:n3BFWWqqLr1UWqKs@webpush.qinwo.mongodb.net/webpush-shard-00-02?retryWrites=true&w=majority'
   
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.use(router)




//serverHttp//

http.createServer(function (req, res) {
    console.log(req.url)
    //Open a file on the server and return its content:
   if(req.url == "/"){
      fs.readFile("./public/index.html", "UTF-8", function(err, html){
          res.writeHead(200, {"Content-Type": "text/html"});
          res.end(html);
      });
    }else if(req.url.match("\.css$")){
      var cssPath = path.join(__dirname, 'public', req.url);
      var fileStream = fs.createReadStream(cssPath);
      res.writeHead(200, {"Content-Type": "text/css"});
      fileStream.pipe(res);
    }else if(req.url.match("\.jpg$")){
      var imagePath = path.join(__dirname, 'public', req.url);
      var fileStream = fs.createReadStream(imagePath);
      res.writeHead(200, {"Content-Type": "image/jpg"});
      fileStream.pipe(res);
    }else if(req.url.match("\.js$")){
      var jsPath = path.join(__dirname, 'public', req.url);
      var fileStream = fs.createReadStream(jsPath);
      res.writeHead(200, {"Content-Type": "text/javascript"});
      fileStream.pipe(res);
    }else if(req.url.match("\.html$")){
      var jsPath = path.join(__dirname, 'public', req.url);
      var fileStream = fs.createReadStream(jsPath);
      res.writeHead(200, {"Content-Type": "text/html"});
      fileStream.pipe(res);
    }else{
      res.writeHead(404, {"Content-Type": "text/html"});
      res.end("No Page Found");
    }
  }).listen(8080,()=>{
    console.log(`Servidor up en http://127.0.0.1:8080/KX$Q0hI`);
  })


/*MONGODB*/
const options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(mongodbRoute, options, (err) => {
    if (err) {
        return console.log(`Error al conectar a la base de datos: ${err}`)
    }
    server.listen(port, () => {
		  console.log(`Servidor up en ${port}`);
	  });
    console.log(`Conexión con Mongo correcta.`)
})


   
 
