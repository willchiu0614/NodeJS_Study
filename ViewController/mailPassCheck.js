


$(document).ready(function () {
    $('#registerAlert').css("display", "none");
    console.log("[viewController/register]register ready");
})
var curTime
window.onload = function(){
  Init();
}
function Init(){
  //只要text裏面的數值還未到0，則不停地以每秒減一的速度進行着
  curTime=10;
  console.log("time:"+curTime);

  if(curTime>0){
    start();
  //一旦清零，就停止
  }else{
    stop();
  }
}
function start(){
  //開啓計時器，每秒text框中的數值自減1
  timer = setInterval(function(){
    curTime--;
    $('#time').text(curTime);
    //當text框中的數值爲0時，停止計時器
    if(parseInt($('#time').text())<=0){
      $('#time').text('逾期');
      clearInterval(timer);
    }
  },1000)
}
//封裝一個清楚延時器的函數
function stop(){
  clearTimeout(timer);
}

//resend
$("#resendBtn").click(function(){
  console.log("resend btn is clicked")
  $.ajax({
    type: 'GET',
    url: '/api/resendMail',
    data:{
      mailAddress:$("#mail").val(),
    },
    success: function (res) {
      console.log("resend sucess",res);
      stop();
      Init();
    }
  })/*.then(()=>{
    //console.log("2 resend sucess");
    //Init();});*/
});

//mailPassCheck
$(function () {
  $('#mailPassCheckForm').submit(function (event) {
    console.log("[viewController/register]mailPassCheck btn click");
    event.preventDefault(); // Prevent the form from submitting via the browser
    var form = $(this);
    $.ajax({
      type: form.attr('method'),
      url: form.attr('action'),
      data: form.serialize(),
      success: function (res) {
        switch (res.returnData) {
          case 0:
            $('#alert').text("驗證碼錯誤");
            $('#alert').css("display", "block");
            break;
          case 1:
            $('#alert').css("display", "none");
            window.location.href="/home/login";
            break;
          
        }
      }
    }).then(success,fail)
  });
});
var success=(data)=> {
  console.log('[viewController/register]成功送出');}
var fail=(data)=> {
  console.log('[viewController/register]無法送出');}