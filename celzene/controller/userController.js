
const User = require('../models/userModel');
exports.createUser = async(req,res) => {
   const{name,email} =req.body;
    const user= new User({
        name: name,
        email: email
    });

    await user.save();

    res.status(201).json({
        success:true,
        data:user
    })
    
}
    