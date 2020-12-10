const mongoose = require('mongoose');

const user = new mongoose.Schema({
    user : String,
	data : {
        urlendpoint:String,
        p256dh: String,
        auth:String,
    },
    vapidKey: {
        publicKey: String,
        privateKey:String
    }
});

module.exports = mongoose.model('users',user)
