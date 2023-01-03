const express = require('express')
const bodyParser = require('body-parser')
const conFig = require('./config/config')

const app = express()

//import body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.send('hello bookstore')
})


app.listen(conFig.PORT, ()=>{
    console.log(`server connected to http://localhost:${conFig.PORT}`);
})