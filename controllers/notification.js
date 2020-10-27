const webpush = require('web-push');
const { json } = require('body-parser');



//mysql//
const mysql = require('mysql')
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'vapikey'
});

connection.connect()

 //subscribirse
exports.subcribirse = (req, res) => { 
    const user = req.body
    const userKeys =JSON.stringify(req.body.keys)
    const json ={endpoint:req.body.endpoint,expirationTime:"null",keys:userKeys}
    const refence = "seco"
    var query = connection.query(`UPDATE users SET ?`,json, function (error, results, fields) {
      if (error) throw error;
      res.status(200).send("bai")
    });
};



exports.pusSMG = async (req, res) =>{
  const userName = req.body.name
  const userList =  await selectUser(userName)
  console.log(userList)
  console.log(body)
  var jsonDat = {vapidKeys:JSON.parse(userList[0].vapidKeys),keys:JSON.parse(userList[0].keys),endpoint:userList[0].endpoint}
  console.log(jsonDat)
  
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
     jsonDat.vapidKeys.publicKey,    
     jsonDat.vapidKeys.privateKey
  );
  const pushSubcription = {
    endpoint: jsonDat.endpoint,
    keys:jsonDat.keys
  }
  webpush.sendNotification(pushSubcription,"your notification push").then(()=>{
    res.status(200).send("your notification push")
  })
}

//selecet users 
exports.usersTrue = (req,res,next) =>{
  const user = req.body.name
  console.log(user)
  connection.query('SELECT * FROM `users` WHERE `user` = ?',[user],function (error, results, fields) {
    if (error) throw error;
    console.log(results.length)
     results.length != 0 ?(
      res.status(200).send({results:true})
    ) : (
      next()
    );
  });
}
//generar vapidKeys
exports.genVapy = (req,res) =>{
  const user = req.body.name
  const vapidKeys = webpush.generateVAPIDKeys();
  const json ={user:user,vapidKeys:JSON.stringify(vapidKeys)}
  var query = connection.query('INSERT INTO users SET ?',json, function (error, results, fields) {
    if (error) throw error;
    res.status(200).send({publicKey:vapidKeys.publicKey,results:false})
  });
}

const selectUser = (dat) =>{
  console.log(dat)
  return new Promise((resolve)=>{
    console.log(dat)
    connection.query('SELECT * FROM `users` WHERE `user` = ?',[dat],(error,results,fields)=>{
      resolve(results)
    })
  })
}