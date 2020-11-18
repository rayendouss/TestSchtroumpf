const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost:27017/MeanStackDB',{
    useNewUrlParser: true ,
    useUnifiedTopology: true ,
    useFindAndModify:false
},(err)=>{
    if(!err)
        console.log('MongoDB connection succeeded')
})
module.exports = mongoose;
