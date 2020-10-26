const webpush = require('web-push');
var mysql      = require('mysql');
const { json } = require('body-parser');
//const { Query } = require('mongoose');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'vapikey'
});
 
connection.connect();
 //json.toString(req.body.keys)

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
  const userList =  await selectUser("iker")
  const body = req.body
  console.log(userList)
  console.log(body)
  var jsonDat = {Vpukey:body.vapidKeys.}
  //res.status(200).send("bai")
  
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    'BOZkG_PQ72qYsvBJ2WUixu9CHnBTIsW8I4mFyfmfFWoBOVYBF3ZXr-nKM2tqTQQlut3XTjm_wXJlGd4efmIfV3k',
    'qdKNwm_anntevrNRHv-T80-brOI66SX1oFOnpHUQZts'
  );
  const pushSubcription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/fx3XbZxoD90:APA91bHvFL5N7uQsX64yFapHM9RdqjexSDm1P8MIBbhDgHpmFITkRfgIEAfR8wPT2ForBlQHo09YjX0QNEV7VL_7XrGvGk2ZTRWR2rOmnqG3uPkG07hF2f8FKwGXczoPvhNWxMZPluWm',
    keys: {
        auth: '6RITcTRKSxL9pVkTxNJXpQ',
        p256dh: 'BP7QaD40-FccuLAOvu_2395420Bp3it9hno8Bo7CTaRz8rrDSSeY1M7uukeH2FIL-kxJc8DQfaR3pxlQX0T7SCU'
    }
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