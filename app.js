//jshint esversion:6

// -------------------  MODULES-------------------------------------------------
require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _= require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// ------------------  MONGOOSE CONNECTION  ------------------------------------
//mongodb selection and setting...
mongoose.connect("mongodb+srv://"+process.env.ID+"@cluster0.xbviiha.mongodb.net/clientDB")
.then(()=>console.log("Successfully connected..."))
.catch((err)=>console.log(err));

// ----------------------  MODELS AND SCHEMAS ----------------------------------

const emailSchema = {
  email:String
};

const Email = mongoose.model("Email",emailSchema);

const formSchema = {
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  },
  message:String
};

const Form = mongoose.model("Form",formSchema);

// -----------------------------------------------------------------------------

app.get("/",(req,res)=>{
  res.render("index");
});

app.post("/",(req,res)=>{
  const cust = new Email({
    email:req.body.email
  });
  cust.save();
  res.redirect("/");
});

app.get("/contact",(req,res)=>{
  res.render("form");
});

app.post("/contact",async (req,res)=>{
  const newForm = new Form({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    message:req.body.message
  });
  try{
    const result = await newForm.save();
    console.log("Inserted...");
    res.render("success");
  }catch(err){
    res.render("failure");
    console.log(err);
  }
});

app.post("/failure",(req,res)=>{
  res.redirect("/contact");
});


app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
