const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
});


//logs a new user in
userSchema.statics.login = function({email, password}){
    return new Promise((resolve, reject) =>{
        User.findOne({email}, (err, doc)=>{
            if(err) return reject(err);
            bcrypt.compare(password, doc.hash, function(err, result) {
                if(err) return reject(err);
                resolve(result);
            });
           });
    });
};

//creates a new user
userSchema.statics.signup = function({email, password}){
    return new Promise((resolve, reject) =>{
        bcrypt.hash(password, 10, function (err, hash) {
            if(err) return reject(err);
            const user = new User({
                email,
                hash
            });
            user.save(err=>{
                if(err) return reject(err);
                resolve(user);
            });
        });
        
    });
};


const User = mongoose.model("User", userSchema);

module.exports = User;