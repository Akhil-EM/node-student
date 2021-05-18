//adding config var
require("dotenv").config();
const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const app=express();
const PORT=process.env.PORT || 6060;

// initialize app
app.use(cors());
app.use(express.json());


// mongoose configuration
mongo_db=mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true});

mongo_db.on('error',(error)=> console.log('mongodb connection error'+error) );
mongo_db.once('open',()=> console.log('connected to mongo db') );

///app base 
app.get("/",(req,res)=>{
    console.log(req)
    res.json({status:"success",message:"app base route is called"});
});

//routers
app.use("/student",require("../src/routers/student.router"));

// open application on port
app.listen(PORT,()=>{
     console.log(`app is running at port ${PORT}`);
});



