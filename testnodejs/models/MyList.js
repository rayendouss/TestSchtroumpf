const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const listSchema = new Schema({
    age: {type: Number , required:true , min:3},
    famille : {type:String, required:true, min:3},
    race : {type:String, required:true, min:3},
    nourriture : {type:String, required:true, min:3},
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    userPr :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
});

module.exports=mongoose.model("MyList",listSchema)
