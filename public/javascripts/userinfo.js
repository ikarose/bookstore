
$("#save").click(()=>{
    var url = "/users/update";

    var uname = $('#newuser').val();
    var upass = $('#newpass').val();
    console.log(uname,upass)
    var info = {
        newuser:uname,
        newpass:upass
    };
    $.post(url,info,(data)=>{
        document.write(data);
    })
    
})
    



