const colors=require('colors-console')
var express = require('express');
const app = express();
var router = express.Router();

var user = require('./user');
const usersModel = require('../Model/user');
var authenticate = require('./authenticate');
var getCookie = require('./getCookie');

const jwt = require('jsonwebtoken') // 雜湊加密
var userState;
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.COOKIE));

/** 利用 Middleware 取得 Header 中的 Rearer Token */
var tokenFunc= async (req,res,next)=>{// 解析token
    console.log("解析token:",req.loginStatus)
    if(req.loginStatus==7)
    {
        res.render('login',{loginStatus:7});
    }
    else if(req.loginStatus==6)
    {
        res.render('login',{loginStatus:6});
    }
    /*else if(req.loginStatus==1)//sucess
    {
        console.log("token correct:"+req.payload.payload.user_auth)
        const singleUser = await usersModel.findOne({Name:req.payload.payload.user_name});
        switch(req.payload.payload.user_auth)
        {
            case 0:
                break;
            case 1: 
                
                if (singleUser) {
                    req.user = singleUser;
                    //next();
                } else {
                    res.send({
                        errmsg: '找不到使用者'
                    })
                }
                res.redirect('/home/allUsers/'+singleUser.Name)
                //res.render('singleUser', { 
                //    name:singleUser.Name,
                //  })
                break;
            case 2:
                allUserData=await user.getAll()
                //console.log("allUserData",allUserData)
                res.render('allUsers', {
                    name:req.payload.payload.user_name+'('+req.payload.payload.user_auth+':admin)',
                    eachUsers: allUserData
                    })
                break;
        }
    }*/
    else{next()}
}
var classifyUserFunc= async (req,res,next)=>{// 解析token
        switch(req.payload.payload.user_auth)
        {
            case 0:
                break;
            case 1: 
                const singleUser = await usersModel.findOne({Name:req.payload.payload.user_name});
                if (singleUser) {
                    req.user = singleUser;
                    res.redirect('/home/allUsers/'+singleUser.Name)
                    //next();
                } else {
                    res.send({
                        errmsg: '找不到使用者'
                    })
                }
                
                /*res.render('singleUser', { 
                    name:singleUser.Name,
                  })*/
                break;
            case 2:
                allUserData=await user.getAll()
                res.redirect('/home/allUsers/');
                /*res.render('allUsers', {
                    name:req.payload.payload.user_name+'('+req.payload.payload.user_auth+':admin)',
                    eachUsers: allUserData
                    })*/
                break;
        }
    
    next()
}

//透過Ajax拿資料
router.get('/users_test1', function(req, res, next) {
    res.render('allUsers');
});

router.get('/allUsers/:name',authenticate,tokenFunc,async (req, res)=> {
    console.log("name:"+req.params.name)
    res.render('singleUser', { 
      name:req.params.name,
    })
  })

// 可直接使用 controller 的方法拿取資料和進行 render
router.get('/allUsers',authenticate,tokenFunc,  async (req, res) => {
    allUserData=await user.getAll()
    console.log("allUserData",allUserData)
    res.render('allUsers', {
        name:req.payload.payload.user_name+'('+req.payload.payload.user_auth+':admin)',
        eachUsers: allUserData
      })
})

//status測試
router.get('/status', function(req, res) {
    // Status: 200 (OK)
    res.status(404).json({'errormessage':'not fund','status':'404'});
    //res.sendStatus(404);
});



// 可直接使用 controller 的方法拿取資料和進行 render
router.get('/authority',authenticate,classifyUserFunc)
//router.get('/authority',authenticate,tokenFunc)
// router.get('/authority',authenticate,tokenFunc,async (req,res)=>{
//     allUserData=await user.getAll()
//     //console.log("allUserData",allUserData)
//     res.render('allUsers', {
//         name:'haha',
//         eachUsers: allUserData
//         })
//   })
router.get('/index', function(req, res) {
    res.render('index',{userName:userState.name});
});

router.get('/logIn', function(req, res, next) {
    res.render('login',{loginStatus:-1});
});

router.get('/signIn', async function(req, res, next) {
    console.log("signin")
    res.render('register');
});

router.get('/mailPassCheck/:mail', async function(req, res, next) {
    res.render('mailPassCheck',{
        mail:req.params.mail,
    });
});

router.get('/', function(req, res, next) {
    res.render('login',{loginStatus:-1});
    //res.render('register');
    console.log("[pageController]render login")
});

router.post('/signIn', async (req, res) => {
    console.log('registerData:',req.body);
    postData = await user.postRegisterData(req);
    console.log(colors(['blueBG','black'],"[pageController]postData:"+ JSON.stringify(postData)));


    // res.render('register', { re_status: postStatus });
    //ajax是異步請求，不會跳轉頁面。此時頁面路徑並沒有發生變化，所以後台的路由不能控制頁面刷新。
    // 給你提供2種解決辦法：
    // 1. 使用window.location.href = url跳轉頁面。url就是需要請求的那個ajax地址
    // 2. ajax請求成功後，在html頁面使用js動態渲染數據。
    res.send({ // ViewController/register.js
        returnData: postData,
      })
})
router.post('/logIn', async (req, res) => {
    console.log(req.body);
    postState = await user.postLoginData(req);
    userState=postState;
    console.log("postState",postState)
    console.log("postState.token",postState.token)
    //將token存在cookie

    res.cookie("token", postState.token, { maxAge: process.env.COOKIE_EXPIRES_IN, httpOnly: true });
    
    //res.cookie("token", postState.token, { maxAge: 6000, httpOnly: true });
    console.log("[pageController]pagectrl:", postState.status);

     //res.render('register', { re_status: postStatus });
    //ajax是異步請求，不會跳轉頁面。此時頁面路徑並沒有發生變化，所以後台的路由不能控制頁面刷新。
    // 給你提供2種解決辦法：
    // 1. 使用window.location.href = url跳轉頁面。url就是需要請求的那個ajax地址
    // 2. ajax請求成功後，在html頁面使用js動態渲染數據。

    res.send({
        status: postState.status,
        token:postState.token
      });
    
})


router.get('/pageA', function(req, res, next) {
    res.send('pageA');
});
router.get('/pageB', function(req, res, next) {
    res.send('pageB');
});



module.exports = router;
