let users={};

const express = require('express');

const app =express();

app.use(express.json());

const port=5500

app.post('/users',(req,res) => {

    const {id,name,age} =req.body;
    users[id]={name,age}

    res.status(201).json({
        success:true,
        data:users
    })
})

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

app.listen(port,()=> {
    console.log("my server has started on port "+ port)
})