const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {type: String , required:true , min:3},
    password : {type:String, required:true, min:3},
});

module.exports=mongoose.model("user",userSchema)
