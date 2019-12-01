const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const item = require("./item.model");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    hash: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    cart: {type: [String], default: []},
    liked: {type: [String], default: []},
});


//logs a new user in
userSchema.statics.login = function ({
                                         email,
                                         password
                                     }) {
    return new Promise((resolve, reject) => {
        User.findOne({
            email
        }, (err, userDoc) => {
            if (err) return reject(err);
            if (userDoc === null) return reject("User not found");
            bcrypt.compare(password, userDoc.hash, function (err, result) {
                if (err) return reject(err);
                if (!result) return reject("Invalid credentials");
                resolve({
                    _id: userDoc._id,
                    email: userDoc.email,
                    created_at: userDoc.created_at,
                    cart: userDoc.cart,
                    liked: userDoc.liked
                });
            });
        });
    });
};

//creates a new user
userSchema.statics.signup = function ({email, password}) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) return reject(err);
            const user = new User({
                email,
                hash
            });
            user.save(err => {
                if (err) return reject(err);
                resolve(user);
            });
        });

    });
};

userSchema.methods.getCartAmount = async function(){
    const items = await item.getItems(this.cart);
    const amount = items.reduce((acc, item) => acc + item.price, 0);
    return ({error: null, amount});
};


const User = mongoose.model("User", userSchema);

module.exports = User;