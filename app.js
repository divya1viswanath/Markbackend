const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")
const res = require("express/lib/response")
const req = require("express/lib/request")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
res.setHeader("Access-Control-Allow-Origin", "*");  
res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"   ); 
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS"   ); 
next(); });

var markModel=Mongoose.model("marks",
new Mongoose.Schema(
    {
        name:String,
        admission:String,
        cgpa:String
    }
))

Mongoose.connect("mongodb+srv://divyav:mzcmongo@cluster0.zdycn.mongodb.net/StudentmarkDb",{useNewUrlParser:true})

app.post("/api/delete",(req,res)=>{
    var getId=req.body
    markModel.findByIdAndRemove(getId, (error,data)=>{
        if(error){
            res.send({"status":"error"})
        }
        else{
            res.send({"status":"success"})
        }
    })
})

app.post("/api/search",(req,res)=>{
    var getAdmission=req.body
    markModel.find(getAdmission,(error,data)=>{
        if(error){
            res.send({"status":"error"})
        }
        else{
            res.send(data)
        }
    })
})

app.get("/api/view",(req,res)=>{
    markModel.find(
        (error,data)=>{
            if(error)
            {
                res.send({"Status":"error"})
            }
            else
            {
                res.send({"status":"success","data":data})
            }
        }
    )
})

app.post("/api/addstudent",(req,res)=>{
   var data=req.body
   let mymark=new markModel(data)
   mymark.save(
       (error,data)=>{
            if(error)
            {
                res.send({"status":"error"})
            }
            else
            {
                res.send({"status":"success","data":data})
            }
       }
   )
})
app.listen(5005,()=>{
    console.log("Server Running")
})