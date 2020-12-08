const Users = require('../models/Users')
//subscribirse

exports.subcribirse = (req, res) => { 
    res.status(200).send("bai")
};

//crear usuarios
exports.createUser = (req, res) => {
    let Userjson = req.body;
    console.log(Userjson)
    var newUser = new Users(Userjson)
    newUser.save(function (err, data) {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion', err });
        if (!data) return res.status(404).send({ message: `dato` });
        res.status(200).send(data);
    });
};

//update user 
exports.updateUser = (req,res) =>{
    let setUser = {
        user: "seco",
        data: {
            urlendpoint: "http:localhost",
            p256dh: "String",
            auth: "String",
            tipouser: "String"
        },
    }
    Users.findOneAndUpdate({"user":"seco"}, { $set: setUser }, function (err, dato) {
        if (err) return res.status(500).send({ message: 'Error al realizar la peticion', err });
        if (!dato) return res.status(404).send({ message: `dato` });
        res.status(200).send({ "actualizada": dato });
    });
}

exports.deleteUser = (req,res)=>{
    
}