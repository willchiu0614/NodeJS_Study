const colors=require('colors-console')
var express = require('express');

const usersModel = require('../Model/user');
const type = require('./type');
const mail=require('./nodemailer')
const bcrypt = require('bcrypt') // 雜湊加密
const jwt = require('jsonwebtoken') // 雜湊加密

const cookieParser=require('cookie-parser')
const app=express()
//宣告發信物件

app.use(cookieParser())





module.exports.postRegisterData = async function (data) {
  
    // 取得使用者註冊資料
    username = data.body.username
    userage=data.body.age
    usersexual=data.body.sexual
    email = data.body.mail
    password = data.body.password
    confirmPassword = data.body.password2
    authority = data.body.authority

    // 檢查該信箱是否已經註冊
    var status
    var returnData={status,username,email}
    await usersModel.findOne({ Mail:email }).then(user => {
      // 如果已經註冊：退回原本畫面
      if (user) {
        console.log('[user]信箱已註冊')
        status = type.UserEnum.mailRepeat
        return
      } else {
        if (password != confirmPassword) {
          console.log('[user]密碼錯誤')
          status = type.UserEnum.passwordNotEqual
          //return
        }
        else {
          // 如果還沒註冊：寫入資料庫
         
         // 雜湊使用者密碼
          const bcryptPwd = bcrypt.hashSync(password, 10)
          return usersModel.create({
            Name:username,
            Age:userage,
            Sexual:username,
            Mail:email,
            Password:bcryptPwd,
            Authority:authority,
            MailCheckVal:'noCode',
            
          })
            .then(() => {
              console.log(colors('cyan',"[user]註冊成功"))
             
              status = type.UserEnum.registerSucess;
              mail(email);
             
              //return 回到pageController.js
            })
            .catch(err => console.log(err))
        }
      }
    })
    returnData.status=status
    returnData.username=username
    returnData.email.email

    return returnData
    //return status
}

module.exports.postLoginData = async function (data) {
  // 取得使用者註冊資料
  email = data.body.mail
  password = data.body.password

  console.log("[route/user]data.body", data.body)
  console.log("[route/user]email", email)
  console.log("[route/user]password", password)

  // 檢查該信箱是否已經註冊
  var state={
    'status':null,
    'name':null,
    'token':null,
  }
  const user = await usersModel.findOne({  Mail:email });
  if (user) {
    console.log('[route/user]信箱存在');
     isPass = await bcrypt.compareSync(password, user.Password);
     
    //const isPass =  bcrypt.compareSync(password, user.Password)
    if (isPass) {
      console.log('[route/user]密碼正確');
      state.status = type.UserEnum.loginSucess;
      state.name=user.Name;

      // 驗證通過 給客戶端返回token 以備後面驗證登陸
      // 生成token
      const payload={
        user_name:user.Name,
        user_mail:user.Mail,
        user_sex:user.Sexual,
        user_age:user.Age,
        user_auth:user.Authority
      }
      const token = jwt.sign({
        payload,
        exp: Math.floor(Date.now() / 1000) + 10//(60 * 15)
      }, process.env.SECRET)
      state.token=token;
      console.log('\x1b[33m',"[route/user]token:",token)
      Object.assign({ code: 200 }, { message: '登入成功', token }); // 登入成功
    }
    else
    {
      console.log('[route/user]密碼錯誤');
      state.status = type.UserEnum.passwordError;
    }
  } else {
    console.log('[route/user]信箱不存在')
    state.status = type.UserEnum.mailError;
  }
  /*
  await usersModel.findOne({ Mail:email }).then(async function(user){
    // 如果已經註冊：退回原本畫面
    console.log('[route/user]-判斷-:'+user);
    if (user) {
      console.log('[route/user]信箱存在');
      console.log(email);
      const isPass =await  bcrypt.compareSync(password, user.Password)
      if (isPass) {
        console.log('[route/user]密碼正確');
        console.log("[route/user]type:", type.LoginEnum.sucess)
        state.status = type.LoginEnum.sucess;
        state.name=user.Name;
      }
      else
      {
        console.log('[route/user]密碼錯誤');
        console.log("[route/user]type:", type.LoginEnum.passwordError);
        state.status = type.LoginEnum.passwordError;
      }
    } else {
      console.log('[route/user]信箱不存在')
      console.log("[route/user]type:", type.LoginEnum.mailError);
      state.status = type.LoginEnum.mailError;
    }
  })*/
  return state;

}

module.exports.getAll = async function(){
  return posts = await usersModel.find();
}

