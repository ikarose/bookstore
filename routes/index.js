var express = require('express');
var router = express.Router();
var conn = require('../utils/conn.js');

router.get('/', function(req, res, next) {
  res.render('index', { title: '读书' });
});

//用户注册
router.get('/register',(req,res)=>{
  res.render('register');
})

router.get('/success',(req,res)=>{
  res.render('success');
})

router.get('/fail',(req,res)=>{
  res.render('fail');
})

router.get('/login',(req,res)=>{
  res.render('/');
})

//书本展示
router.get('/books',(req,res)=>{
  var username = req.session.username;
  if(username){
    var findData = (db,cb)=>{
      var book = db.collection("books");
      book.find({},{_id:0}).toArray((err,result)=>{
          if(err) throw err;
          cb(result);
        })
      }
      conn.getDb((err,db)=>{
        if(err) throw err;
        findData(db,(result)=>{
          res.render("books",{result:result,username:req.session.username});
        });
        db.close();
      })
  }else{
    res.send(`<script>
    alert("当前账户已过期，请重新登录");
    location.href="/";    
    </script>`);
  }

})





//注销
router.get('/logout',(req,res)=>{
  req.session.destroy((err)=>{
    if(err) throw err;
    res.redirect('/');
  })
})


module.exports = router;
