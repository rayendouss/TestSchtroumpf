var express = require('express');
var router = express.Router();
const bcrypt= require("bcrypt")
const jwt =require("jsonwebtoken")
const User = require('../models/User')
const Schtroumpf = require('../models/Schtroumpf')
const MyList = require('../models/MyList')
const JWT_SECRET= "token"
/* GET users listing. */

router.post("/register",function (req,res,next) {
  var user = new User({
    name: req.body.name,
    password : req.body.password
  })
  User.findOne({name:req.body.name},function(err,doc){
    if(!doc){
      user.save((err,result)=>{
        res.json({msg:"Bienvenue"})
      })
    }
    else{
      res.json({msg:"User already exist"})
    }
  })
})
router.post("/login",function (req,res,next) {
  var user = new User({
    name: req.body.name,
    password : req.body.password
  })
  User.findOne({name:req.body.name,password:req.body.password},function(err,doc){
    if(doc){
      let token = jwt.sign({
        user
      },JWT_SECRET,{expiresIn: "24h"})
      res.send({
        token:token , msg:"Bienvenue" , userc:doc
      }
      )
}
    else{
      res.send({msg:"User inexist"})
    }
  })
})
router.get("/all",function (req,res,next) {
 let token = req.header("Authorization");
  try{
    let data = jwt.verify(token,JWT_SECRET)
    res.json(data)
  }catch (e) {
    res.send("invalid token")
  }
})
function verifyToken(req, res, next) {
  // Get auth header value
  const header = req.header("Authorization");
  // Check if header is undefined
  if (typeof header !== 'undefined') {
    // Set the token
    req.token = header;
    // Next
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
router.post("/ajoutInf",function (req,res,next) {

    // Check Authorization


   var sch= new Schtroumpf({
     age:req.body.age,
     famille:req.body.famille,
     race : req.body.race,
     nourriture:req.body.nourriture,
     user:req.body.user

   })
      sch.save((err,result)=>{
        res.json({msg:"Information Added "})
      })




})
router.put("/modifInf/:id",function (req,res,next) {


    // Check Authorization

      var sch= new Schtroumpf({
        _id:req.params.id,
        age:req.body.age,
        famille:req.body.famille,
        race : req.body.race,
        nourriture:req.body.nourriture,
        user:req.body.user

      })
      Schtroumpf.findOne({_id:req.params.id},function(err,doc){
        console.log(doc.user)
        console.log(req.body.user)
        if(doc.user.toString()==sch.user.toString()){
          Schtroumpf.findByIdAndUpdate(req.params.id,{ $set: sch}, {new:true},(err,doc)=>{
            if(!err) {
              console.log(doc)
              res.send(doc);
            }
            else {
              console.log(err)
            }
          })
        }else{
          res.json({msg:"error"})
        }
      })



    }


)
router.get("/allSch",function (req,res,next) {
   Schtroumpf.find((err,docs)=>{
     res.send({"allSch":docs})
   })
})

router.get("/mySch/:id",function (req,res,next) {
  Schtroumpf.findOne({user:req.params.id},function(err,doc){
    res.json({doc})
  })
})

router.get("/addList/:id/:idp" , function (req,res,next) {

  var sch = new Schtroumpf({})

    Schtroumpf.findOne({_id:req.params.id},function (err,doc) {
      console.log(req.params.idp)
      console.log(req.params.id)
      console.log(doc)
      var list = new MyList({
        age:doc.age,
        famille:doc.famille,
        race:doc.race,
        nourriture:doc.nourriture,
            user:doc.user,
        userPr:req.params.idp
      })

             list.save((err,doc)=>{
             Schtroumpf.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
               res.json({msg:"Schtroumpf added "})
             })

             })


    })
})
router.get("/myList/:id",function (req,res,next) {
           MyList.find({userPr:req.params.id},function (err,doc) {
                  res.json({doc})
           })
})
router.get("/remove/:id/:idp" , function (req,res,next) {

  var list = new MyList({})

  MyList.findOne({_id:req.params.id},function (err,doc) {
    console.log(req.params.idp)
    console.log(req.params.id)
    console.log(doc)
    var sch = new Schtroumpf({
      age:doc.age,
      famille:doc.famille,
      race:doc.race,
      nourriture:doc.nourriture,
      user:doc.user,

    })

    sch.save((err,doc)=>{
      MyList.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
        res.json({msg:"Schtroumpf deleted "})
      })

    })


  })
})
module.exports = router;
