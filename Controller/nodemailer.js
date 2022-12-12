const nodemailer = require('nodemailer');
const usersModel = require('../Model/user');



//建立一個smtp伺服器
const config = {
    service: 'Gmail',
    auth: {
        user: 'willchou0614@gmail.com', 
        pass: 'wpletzwubwlqisju' //郵箱的授權碼，不是註冊時的密碼,等你開啟的stmp服務自然就會知道了
    }
};
// 建立一個SMTP客戶端物件
const transporter = nodemailer.createTransport(config);

// 生成6位随机数
randomFns=()=> {
    let code = ""
  
    var arr=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    //產生4位驗證碼
    for(var i=0;i<6;i++){
      pos=parseInt(Math.random()*(arr.length-1));
      code+=arr[pos];
    }
   
    return code 
}

//傳送郵件
module.exports =async function (email){
    
    //setCode(code);
    //let code=await getCode(email);
    let code=randomFns();
    transporter.sendMail(options= {
        //寄件者
        from: 'willchou0614@gmail.com',
        //收件者
        to:email, 
        //副本
        //cc: 'account3@gmail.com',
        //密件副本
        //bcc: 'account4@gmail.com',
        //主旨
        subject: '測試信件', // Subject line
        //純文字
        text: 'Hello world2', // plaintext body
        //嵌入 html 的內文
        html: '<p>--你好！</p><p>您正在註冊帳號</p><p>你的驗證碼是：<strong style="color: #ff4e2a;">'+code+'</strong></p><p>***該驗證碼5分鐘內有效***</p>', 
        //附件檔案
        /*attachments: [ {
            filename: 'text01.txt',
            content: '.....'
        }, {
            filename: 'unnamed.jpg',
            path: '/Users/Pictures/unnamed.jpg'
        }]*/
      }, function(error, info){
        if(error) {
            return console.log(error);
        }
        else
        {
            usersModel.findOneAndUpdate(
                {
                  Mail: email
                },
                {
                    MailCheckVal: code
                },
                {
                  new: true,
                }
              ).then((data) => {
                console.log('data', data)
              })
        }
        console.log('\x1b[33m','mail sent:', info.response);
    });
};

module.exports.check = async function (mailAddress,val){
    let result=await usersModel.findOne({ Mail:mailAddress })
    let code=result.MailCheckVal;
    if(val==code)
    {
        console.log("驗證成功")
        usersModel.findOneAndUpdate(
            {
              Mail: mailAddress
            },
            {
              State: 1
            },
            {
              new: true,
            }
          ).then((data) => {
            console.log('data', data)
          })
          
        return 1;
    }
    return 0;  
}