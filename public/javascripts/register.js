$(function(){
    jQuery.validator.addMethod("lettersonly", function(value, element) {
        return this.optional(element) || /^[^:%,'\*\"\s\<\>\&]+$/i.test(value);
    }, "Letters only please"); 
    jQuery.validator.addMethod("lettersmin", function(value, element) {
        return this.optional(element) || ($.trim(value.replace(/[^\u0000-\u00ff]/g,"aa")).length>=4);
    }, "Letters min please"); 
    jQuery.validator.addMethod("lettersmax", function(value, element) {
        return this.optional(element) || ($.trim(value.replace(/[^\u0000-\u00ff]/g,"aa")).length<=10);
    }, "Letters max please");
    $("#register_form").validate({
        errorPlacement: function(error, element){
            error.css({"color":"red","fontSize":"11px"});
           error.insertBefore(element.parent());
        },
        submitHandler:function(form){
            ajaxpost('register_form', '', '', 'onerror') 
        },
        rules:{
            username:{
                required:true,
                lettersmin:true,
                lettersmax : true,
                lettersonly : true
            },
            password:{
                required:true,
                minlength: 6,
                maxlength: 20
            },
            password_confirm:{
                required : true,
                minlength: 6,
                maxlength: 20,
                equalTo  : "#password"
            },
            agree:{
                required:true
            }
        },
        messages:{
            username:{
                required : '用户名不能为空',
                lettersmin : '用户名必须在4-10个字符之间',
                lettersmax : '用户名必须在4-10个字符之间',
                lettersonly: '用户名不能包含敏感字符'
            },
            password  : {
                required : '密码不能为空',
                minlength: '密码长度应在6-20个字符之间',
                maxlength: '密码长度应在6-20个字符之间'
            },
            password_confirm : {
                required : '请再次输入您的密码',
                minlength: '密码长度应在6-20个字符之间',
                maxlength: '密码长度应在6-20个字符之间',
                equalTo  : '两次输入的密码不一致'
            },
            agree : {
                required : '请阅读并同意该协议'
            }
        }
    });
});