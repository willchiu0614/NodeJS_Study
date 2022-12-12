$(document).ready(function () {
  console.log('yayayayyaya')
  //getData();
})
var userJsonDataName = [];//
var userJsonDataAge = [];
var userJsonDataSexual = [];
var userJsonDataMail = [];

function getData() {
  
  var userJsonData = [];
  $.ajax({
    type: "get",
    async: false,
    url: "/db/user",//routeController/user
    dataType: "json",
    success: function (data) {
      userJsonData = data;
      console.log("ohohohhoho")
      console.log(data)
      $('#test').html(data[0].Name)
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert(XMLHttpRequest.status);
      alert(XMLHttpRequest.readyState);
      alert(textStatus);
    },
  });
  
  

  for (var i = 0; i <userJsonData.length; i++) {
    userJsonDataName.push[userJsonData[i].Name];
    userJsonDataAge.push[userJsonData[i].Age];
    userJsonDataSexual.push[userJsonData[i].Sexual];
    userJsonDataMail.push[userJsonData[i].Mail];
  
}
return userJsonData
}
