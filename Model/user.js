const mongoose=require('mongoose');

const PostSchema=mongoose.Schema(
    {
        Name:{
            type:String,
            required: true
        },
        Age:{
            type:Number,
            required: true
        },
        Sexual:{
            type:String,
            //enum:["boy","girl"],
            default:"boy"
        },
        Mail:{
            type:String,
            required: true
        },
        Password:{
            type:String,
            required: true,
            /*set(val){
            // 通過bcryptjs對密碼加密返回值 第一個值返回值， 第二個密碼強度
            return require('bcryptjs').hashSync(val,10)
            }*/
        },
        MailCheckVal:{
            type:String,
            required:true,
        },
        Authority:{
            type:Number,
            default:0
        },
        State:{
            type:Number,
            default:-1
        }
    }
);
module.exports=mongoose.model('userModel',PostSchema);