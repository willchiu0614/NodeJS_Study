import { userSignUp,userLogIn } from "/js/pageApi.js"; 
$(document).ready(function () {
  console.log("載入頁面完成")
  console.log("loginStatus:",$('#loginStatus').text())
  if($('#loginStatus').text()==6)
  {
    setAlert(7);
  }
  else if($('#loginStatus').text()==7)
  {
    setAlert(8);
  }
  else
  {
    setAlert(0);
  }


})


//register
var  authority=0;
$("#AuthoritySelect").selectmenu();
$('#AuthoritySelect').on('selectmenuchange', function() {
 authority=$(this).val();
 console.log("authority:"+authority)
});

//$("#loginStatus").change(setAlert($("#loginStatus").val))
$(function () {
    $('#registerForm').submit(function (event) {
      event.preventDefault(); // Prevent the form from submitting via the browser
      var form = $(this);
      authority=$('#AuthoritySelect').val();
      var data=form.serialize()+'&authority='+authority
      console.log("register data:",data)
      userSignUp(data)
      .then((res)=>{
        var returnData=res.data.returnData
        setAlert(returnData.status,"/home/mailPassCheck/"+returnData.email)
          /*switch (returnData.status) {
            case 0:
              $('#alert').css("display", "none");
              break;
            case 1:
              $('#alert').css("display", "none");
              window.location.href="/home/mailPassCheck/"+returnData.email;
              break;
            case 2:
              $('#alert').text("email 已經被註冊過");
              $('#alert').css("display", "block");
              break;
            case 3:
              $('#alert').text("密碼錯誤");
              $('#alert').css("display", "block");
              break;
          }*/
      })
      .then(success,fail);
    });
  });
  


//login
$(function () {
    $('#loginForm').submit(function (event) {
      event.preventDefault(); // Prevent the form from submitting via the browser
      var form = $(this);
      userLogIn(form.serialize()).then(res=>{
        console.log("res:",res);
        console.log("status:",res.data.status)
        console.log("token:",res.data.token)
        //localStorage.setItem('token', res.data.token);
        setAlert(res.data.status,"/home/authority")
        /*switch (res.data.status) {
          
          case 0:
            $('#alert').css("display", "none");
            break;
          case 1:
            $('#alert').css("display", "none");
            window.location.href="/home/allUsers2";
            break;
          case 2:
            $('#alert').text("無此email");
            $('#alert').css("display", "block");
            break;
          case 3:
            $('#alert').text("密碼錯誤");
            $('#alert').css("display", "block");
            break;
        }*/
      }).then(success,fail);
    });
  });
    
  var success=(data)=> {
    console.log('成功送出');}
  var fail=(data)=> {
    console.log('無法送出',data);}







var setAlert=(status,url=null)=>{
  console.log("setAlert:",status)
  switch (status) {
          
    case 0:
      $('#alert').css("display", "none");
      break;
    case 1:
      $('#alert').css("display", "none");
      window.location.href=url;
      break;
    case 2:
      $('#alert').text("email 已經被註冊過");
      $('#alert').css("display", "block");
      break;
    case 3:
      $('#alert').text("密碼錯誤");
      $('#alert').css("display", "block");
      break;
    case 4:
      $('#alert').css("display", "none");
      window.location.href=url;
      break;
    case 5:
      $('#alert').text("無此email");
      $('#alert').css("display", "block");
      break;
    case 6:
      $('#alert').text("密碼錯誤");
      $('#alert').css("display", "block");
      break;
    case 7:
      $('#alert').text("逾時");
      $('#alert').css("display", "block");
      break;
    case 8:
      $('#alert').text("發生問題，請重新登入");
      $('#alert').css("display", "block");
      break;
    case 9:
      $('#alert').text("請登入");
      $('#alert').css("display", "block");
      break;
  }

  
}

var testConsole=()=>{
  console.log("testConsole")
}

