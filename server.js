const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require("method-override")
const Article = require('./models/article')
const app     = express()
const articleRouter = require("./routes/articles")

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost/blog1' , ()=>{
    console.log("connected");
}, e => console.log(e));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"))

app.set("view engine" , "ejs")
 //with this we can access fields in the form from the body    


app.get("/" , async (req , res)=>{
    const articles = await Article.find({}).sort({createdAt : "desc"})
    res.render("articles/index" , {articles : articles})
})
app.use("/articles" , articleRouter)

app.listen(port , ()=>{
    console.log(`server listen on port ${port}`);
}) 