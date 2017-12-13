var express = require('express');
var router = express.Router();
var conn = require("../utils/conn");
var async = require("async");


//详情页
router.get('/', function(req,res){
    var id = parseInt(req.query["id"])+'';
    var findData = (db,cb)=>{
        var book = db.collection("books");
        book.find({id:id},{_id:0}).toArray((err,result)=>{
            if(err) throw err;
            cb(result);
        })
    }

    conn.getDb((err,db)=>{
        if(err) throw err;
        findData(db,(result)=>{
            res.render("detail",{result:result[0],username:req.session.username});
        })
    })
});




module.exports = router;