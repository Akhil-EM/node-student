const {  validationResult } = require('express-validator');


//models
const STUDENT_MODEL=require("../models/student.model");

exports.createStudent=(req,res)=>{
     //throw validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())  return res.json({status:"error",message:{errors: errors.array()}});
    

    let studentObj={
            name:req.body.name,
            class:req.body.class,
            rollNo:req.body.rollNo,
            email:req.body.email,
            address:{home:req.body.home,place:req.body.place,pincode:req.body.pincode},
            active:false}
    
    let student_model=new STUDENT_MODEL(studentObj);
    
    //check whether the email exists or not 
    STUDENT_MODEL.findOne({email:req.body.email})
                 .then((_student)=>{
                     if(_student)return res.json({status:"error",message:"this email already taken"});

                     //email not taken continue saving student
                      student_model.save()
                                   .then((_student)=>{
                                        //console.log(_student)
                                        res.json({status:"success",message:`new student ${_student.name} is registered`});
                                    }).catch((err)=>{
                                        console.log("student saving server error",err);
                                        res.json({status:"error",message:"server error"});
                                      });
                 }).catch((err)=>{
                        console.log("email finding  server error",err);
                        res.json({status:"error",message:"server error"});
                    });
   
    

};

exports.fetchStudents=(req,res)=>{
     STUDENT_MODEL.find()
                  .then((_students)=>{
                      console.log(_students.length)
                      if (_students.length == 0) return res.json({status:"error",message:"no students found"});

                      res.json({status:"success",message:{students:_students}})
                  }).catch((err)=>{
                      console.log("student fetch error",err);
                      res.json({status:"error",message:"server error"});
                  });
};

exports.editStudent=(req,res)=>{
  //console.log((req.body.id).length)
  //throw validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty())  return res.json({status:"error",message:{errors: errors.array()}});
 
   //student object 
   let studentObj={
            name:req.body.name,
            class:req.body.class,
            rollNo:req.body.rollNo,
            email:req.body.email,
            address:{home:req.body.home,place:req.body.place,pincode:req.body.pincode},
            active:false}

   STUDENT_MODEL.findByIdAndUpdate(req.body.id,studentObj,{new:true})
                .then((_student)=>{
                     res.json({status:"success",message:{student:_student}});
                }).catch((err)=>{
                     console.log("student edit error",err);
                     res.json({status:"error",message:"server error"});
                });
};


exports.deleteStudent=(req,res)=>{
    //console.log((req.body.id).length)
    //throw validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())  return res.json({status:"error",message:{errors: errors.array()}});
   

     ///delete student
     STUDENT_MODEL.findByIdAndDelete(req.body.id)
                  .then((_student)=>{
                       if(!_student)return res.json({status:"error",message:"student having that id not not found"});

                       res.json({status:"success",message:`student ${_student.name} is deleted `});
                  }).catch((err)=>{
                       console.log("student delete error",err);
                       res.json({status:"error",message:"server error"});
                  });
};
