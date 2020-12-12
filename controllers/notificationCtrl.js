const Users = require('../models/Users')
const webpush = require('web-push')





exports.pusSMG = async(req,res)=>{
  const userName = req.body.user
  let user = await Users.find({user:userName}).exec()
  webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    user[0].vapidKey.publicKey,
    user[0].vapidKey.privateKey
  )
  const pushSubscription = {
    endpoint: user[0].data.urlendpoint,
    keys: {
      auth: user[0].data.auth,
      p256dh: user[0].data.p256dh
    }
  };
  webpush.sendNotification(pushSubscription,'Your Push Payload Text')
  res.status(200).send(user)
}




 //subscribirse



/*
exports.pusSMG = async (req, res) =>{
  const userName = req.body.name
  const userList =  await selectUser(userName)
  console.log(userList)
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
  }).catch(()=>{
      res.status(200).send("error")
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
  res.status(200).send({publicKey:vapidKeys.publicKey,pribateKey:vapidKeys.privateKey})
}
*/
