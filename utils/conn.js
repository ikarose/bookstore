var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var CONN_DB_STR = "mongodb://47.94.208.182:27017/zuoxu";

module.exports = {
    getDb:(cb)=>{
        MongoClient.connect(CONN_DB_STR,(err,db)=>{
            if(err){
                cb(err,null);
            }else{
                cb(null,db);
            }
        })
    }
}