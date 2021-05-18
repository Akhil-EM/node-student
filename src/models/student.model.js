const mongoose=require("mongoose");

const student=mongoose.Schema({
              name:{type:String,required:true},
              class:{type:String,required:true},
              rollNo:{type:String,required:true},
              email:{type:String,required:true},
              address:{home:{type:String},place:{type:String},pincode:{type:Number}},
              active:{type:Boolean,required:true}   
          },{timestamps:true});


module.exports=mongoose.model("students",student);