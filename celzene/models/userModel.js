//we are defining what a user obj in user schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //npm install bcrypt

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true,
    unique:true //if duplicate email comes it throws error
   },
   role: {
    type:String,
    required:true,
    enum:['Admin','Student','Teacher'] //if any other role insted of these is gvn it throwes error
   },
   password:{
    type:String,
    required:true
   }
})

//to encrypt the password
userSchema.pre('save',async function(next)   {
    //call this funtion to do the encryption before saving it into my database
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); //acts as middleware
})

//to dcrypt the password while comparing the value of user actual password against its encrypted password
userSchema.methods.matchPassword =async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User =mongoose.model('User',userSchema)
module.exports = User;
