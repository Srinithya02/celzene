//this controller will basically have all the functions with logic 
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const secretKey = "celzene"

// Generate a token
const generateToken = (id, role) => {
    return jwt.sign({id: id, role: role}, secretKey, {
        expiresIn:'24h'
    })
}

//creating a new user with name and email
exports.createUser = async(req,res) => {
    try{
        const{name ,email ,role ,password} = req.body;

        //user is a mongodb document
            const user= new User({
                name: name,
                email: email,
                role: role,
                password: password
            });

            //saving this user inside mongodb.we are inserting the mongodb document inside user mongodb collection
            await user.save();

            const token = generateToken(user._id, user.role)

            res.status(201).json({
                success:true,
                token:token,
                data:user
            })

    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.findOne({email:email})

        console.log("password",password)
        if(user && (await user.matchPassword(password)))  {
            const token = generateToken(user._id, user.role);
            res.json({
                success:true,
                token:token,
                data:user
            })
        } 
    } catch(err) {
        res.status(500).json({
            success:false,
            message:'err.message'
        })
    }
}

//this function gets all the users inside mongodb
exports.getAllUsers = async(req,res) => {
    try{
        const {page, limit} = req.query
        //transfer my operatio to show me only entries in this page
        const users = await User.find({}).limit(limit).skip((page-1) * limit).exec();
    
    res.status(200).json({
        success:true,
        data:users
    }) 
    } catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
      
}

//this funtion is used to update user by its id
exports.updateUserById = async(req,res) => {
    const {id} = req.params
    const{name,email} = req.body
    
    //this is operation to find userand uodate the user
    const user = await User.findByIdAndUpdate(id, {name:name , email:email})

    res.status(200).json({
        success:true,
        data:user
    })
}