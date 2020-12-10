const Users = require('../models/Users')
const webpush = require('web-push')





//crear usuarios
exports.createUser = (req, res) => {
    console.log(req.body)
    let vapidKeys = webpush.generateVAPIDKeys()
    let Userjson = {
        user : req.body.user,
        bata: "null",
        vapidKey:{
            publicKey: vapidKeys.publicKey,
            privateKey:vapidKeys.privateKey
        }
    }
    console.log(Userjson)
    var newUser = new Users(Userjson)
    newUser.save(function (err, data) {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion', err });
        if (!data) return res.status(404).send({ message: `dato` });
        res.status(200).send(vapidKeys.publicKey);
    });
};

//update user 
exports.updateUser = (req,res) =>{
    let setUser = {
        data: {
            urlendpoint: req.body.urlendpoint,
            p256dh: req.body.p256dh,
            auth: req.body.auth,
            tipouser: req.body.tipouser
        }
    }
    Users.findOneAndUpdate({user:req.body.user}, { $set: setUser }, function (err, dato) {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion', err });
        if (!dato) return res.status(404).send({ message: `dato` });
        res.status(200).send({ "actualizada": dato });
    });
}

//deleteUser
exports.deleteUser = (req,res,next) =>{
    Users.findOneAndRemove({user:req.body.user}, (err, data) => {
        if (err) return res.status(500).send({ message: `Error al borrar el usuario: ${err}` });
       // if (!data) return res.status(404).send({ message: `No existe ese usuario` });
        //res.status(200).send({ "Usuarios": data });
        next()
    });
}


