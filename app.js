const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")

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

Mongoose.connect("mongodb+srv://divyav:mzcmongo@cluster0.zdycn.mongodb.net/StudentmarkDb")

app.post("/api/search",(req,res)=>{
    var getName=req.body
    markModel.find(getName,(error,data)=>{
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
app.listen(8000,()=>{
    console.log("Server Running")
})