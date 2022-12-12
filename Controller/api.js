const express = require('express');
const router = express.Router();


// // Import Routes
const mail = require('./nodemailer');
const auth = require('./authenticate');

router.get('/resendMail', async (req, res) => {
    console.log("resendMailData:",req.query.mailAddress)
    mail(req.query.mailAddress);
    console.log("mail.resend() finish")
    res.send();
  });



router.post('/mailCheck', async (req, res) => {
    
    console.log('\x1b[33m',"mailCheck:",req.body)
    mailAddress=req.body.mailAddress;
    val=req.body.mailPassNum;
    var result=await mail.check(mailAddress,val);
    console.log('\x1b[33m',"mailCheckState:"+result)
    res.send({ // ViewController/mailPassCheck.js
        returnData: result,
      })
  });

  router.post('/authenticate', async (req, res) => {
    res.send(req.user)
  });

  

 module.exports = router;