const express=require("express");
const {body} =require("express-validator");

const router=express.Router();

//requiring controllers 
const student_controller=require("../controllers/student.controller");

// create student
router.post("/",[body("name", "Enter a valid name").trim().not().isEmpty(),
                 body("class","Enter a valid class").trim().not().isEmpty(),
                 body("rollNo","Enter a valid roll number").not().trim().isEmpty(),
                 body("email","Enter a valid email id").isEmail(),
                 body("home","Enter a home address").trim().not().isEmpty(),
                 body("place","Enter a valid place").trim().not().isEmpty(),
                 body("pincode","Enter a valid pincode").isLength({ min: 6, max:6 })],
                 student_controller.createStudent);

router.get("/",student_controller.fetchStudents);

router.put("/",[body("name", "Enter a valid name").trim().not().isEmpty(),
                body("class","Enter a valid class").trim().not().isEmpty(),
                body("rollNo","Enter a valid roll number").not().trim().isEmpty(),
                body("email","Enter a valid email id").isEmail(),
                body("home","Enter a home address").trim().not().isEmpty(),
                body("place","Enter a valid place").trim().not().isEmpty(),
                body("pincode","Enter a valid 6 digit  pincode").isLength({ min: 6, max:6 }),
                body("id","Enter a valid 24 char long id").isLength({ min: 24, max:24 }),],
                student_controller.editStudent);

router.delete("/", body("id","Enter a valid 24 char long id").isLength({ min: 24, max:24 }),
                 student_controller.deleteStudent)

module.exports=router;