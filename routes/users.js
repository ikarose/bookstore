var express = require('express');
var router = express.Router();
var conn = require("../utils/conn");
var async = require("async");
var session = require("express-session");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//用户注册
router.post('/register',(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;

  var insertData = (db,cb)=>{
    var user = db.collection("userinfo");
    async.waterfall([
      (cb)=>{
        user.find({username:username}).toArray((err,result)=>{
          if(err) throw err;
          if(result.length>0){
            cb(null,true);
          }else{
            cb(null,false);
          }
        })
      },
      (arg,cb)=>{
        if(!arg){
          user.insert({username:username,password:password},(err,result)=>{
            if(err) throw err;
            console.log("插入成功!");
            console.log(result);
            cb(null,"0");
          })
        }else{
          cb(null,"1");
        }
      }
    ],(err,result)=>{
      if(err) throw err;
      cb(result);
    })
  }
  conn.getDb((err,db)=>{
    if(err) throw err;
    insertData(db,(result)=>{
      if(result=="0"){
        console.log("插入成功");
        res.send(`<script>location.href="/success"</script>`);
      }else{
        console.log("插入失败");
        res.redirect("/fail");
      }
      db.close();
    })
  })
})



//用户登录
router.post('/login',(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;
  var findData = (db,cb)=>{  
    var user = db.collection("userinfo");
    async.waterfall([
      (cb)=>{
        user.find({username:username}).toArray((err,result)=>{
          if(err) throw err;
          cb(null,result);
        })
      },
      (arg,cb)=>{
        if(arg.length>0){
          user.find({username:username,password:password}).toArray((err,result)=>{
            if(err) throw err;
            if(result.length>0){
              cb(null,1);
            }else{
              cb(null,2);
            }
          })
        }else{
          cb(null,0);
        }
      }
    ],(err,result)=>{
      if(err) throw err;
      cb(result);
    })
  }

  conn.getDb((err,db)=>{
    if(err) throw err;
    findData(db,(result)=>{
      if(result==0){
        res.send({status:0});
      }else if(result==1){
        req.session.username = username;
        res.send({status:1});
      }else if(result==2){
        res.send({status:2});
      }
      db.close();
    })
  })

})

//用户信息
router.get('/userinfo',(req,res)=>{
  res.render('userinfo',{username:req.session.username});
})


//修改用户信息
router.post('/update',(req,res)=>{
  var newuser = req.body.newuser;
  var newpass = req.body.newpass;
  var username = req.session.username;
  console.log(newuser,newpass);
  if(username){
    conn.getDb((err,db)=>{
      if(err) throw err;
      var user = db.collection("userinfo");
      user.update({username:username},{$set:{username:newuser,password:newpass}},
      (err,result)=>{
        if(err) throw err;
        console.log("success");
        res.send(`<script>alert("评论修改成功");location.reload();</script>`);
        db.close();
      })

    })
  }else{
    res.send(`<script>alert('session已经过期,请重新登录!');location.href='/'</script>`)
  }
  

  
})




module.exports = router;
