$("#login").click(()=>{
    var url = "/users/login";
    var info = {username:$("#username").val(),password:$("#password").val()};
    $.post(url,info,(data)=>{
        if(data.status=="1"){
            location.href ="/books";
        }else if(data.status=="0"){
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.alert('输入的用户名不存在', {
                    icon: 5,
                    skin: 'layer-ext-moon',
                    time:2000
                })
            });    
        }else if(data.status=="2"){
            layui.use('layer', function(){
                var layer = layui.layer;
                layer.alert('密码输入错误', {
                    icon: 5,
                    skin: 'layer-ext-moon',
                    time:2000
                })
            });    
        }

        
    })
})


