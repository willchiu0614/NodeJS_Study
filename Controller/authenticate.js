const jwt = require('jsonwebtoken');
const axios = require('axios');
const { check } = require('./nodemailer');


var checkFacebookToken = async (accessToken) => {
 
  var check = await axios.get(
   `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
 );
 console.log("checkFacebookToken:", check.data);
 return check.data;
 // if(check!=undefined)
 // {
 //   console.log("checkFacebookToken:", check.data);
 //   var fbPayload={
 //    user_name:check.data.name,
 //    user_mail:check.data.email,
 //    user_sex:"no",
 //    user_age:999,
 //    user_auth:1
 //  }
 //  return fbPayload;
 // }
 // return check;
}

module.exports = async (req, res, next) => {

  /*console.log("req.header:", req.headers )
  const bearerHeader  = req.headers.authorization*/

  //利用cookie紀錄token
  console.log("req.cookies:", req.cookies.token)
  console.log("req.cookies 2:", req.cookies)
  const token = req.cookies.token
  //console.log("authorization:",bearerHeader )
  if (typeof token !== 'undefined') {
    //const token = String(bearerHeader).split(' ')[1];
    req.token = token; // 在response中建立一個token參數
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET, async (err, payload) => {
        if (err) {
          data=await checkFacebookToken(token)
          if (data!=undefined) {
            console.log("fb token ",data)
            var fbPayload={
              payload:{
                user_name:data.name,
                user_mail:data.email,
                user_sex:"no",
                user_age:999,
                user_auth:1
              }
              
            }
            req.payload = fbPayload;
            req.loginStatus = 1
            next();
          }
          else {
            console.log("token error")
            req.loginStatus = 6
            next();
          }
          //reject(err); // 驗證失敗回傳錯誤
        } else {
          console.log("token sucess")
          req.payload = payload;
          req.loginStatus = 1
          next();
          resolve(payload); // 驗證成功回傳 returnData
        }
      });
    }).then((result) => {
      console.log("token 驗證成功,returnData:", result)
    }).catch((err) => { return res.status(401).send(err); })// 失敗回傳錯誤訊息
  }
  else {
    req.loginStatus = 7
    //res.status(403).send(Object.assign({ code: 403 }, { message: 'cookie has no token！' })); // Header
    //查無 Rearer Token
    next();
  }






}

