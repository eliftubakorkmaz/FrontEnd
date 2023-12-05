const mongoose = require("mongoose");
const uri = "mongodb+srv://etubas:no2212wol@testdb.u85b4ow.mongodb.net/"

function connect(){
    mongoose.connect(uri).then(res => {
        console.log("Mongodb bağlantısı başarılı");
    });
}

module.exports = connect;