let users={};

//npm install express
const express = require('express');

//import mongoosedb
const mongoose = require('mongoose');

const app =express();

//middleware
app.use(express.json());

const port=4500

const mongoUrl ="mongodb+srv://srinithyachinthala:IK1fHwbpiVvDSHG3@cluster0.4b3qdnf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

//connect to mongoodb
mongoose.connect(mongoUrl,{})

mongoose.connection.on('connected',()=>{
    console.log("connected to mongoose successfully");
})


const userRoutes=require('./routes/userRoute')
console.log("Routed successfully");
app.use('/api',userRoutes)

/*
app.put('/update/:id',(req,res)=>{
    const{id}=req.params
    const{name,age}=req.body
    users[id]={name,age}

    res.status(200).json({
        success:true,
        data:users
    })
})


app.get('/data', (req,res) => {
    res.send({
          name: 'srinithya',
          age:23
    })
    
})
    */

//listen on port 4500 and start the server
app.listen(port,()=> {
    console.log("my server has started on port "+ port)
})

