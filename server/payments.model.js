const mongoose = require("mongoose");

const paymentsSchema = new mongoose.Schema({
    cart: {type: [String], default: [], required: true},
    userId: {type: mongoose.Schema.Types.ObjectId},
    amount: {type: Number, required: true},
    created_at: {type: Date, default: Date.now},
});

paymentsSchema.statics.getUserPayments = function(userId){
    return this.find({
       "userId": userId
    });
};

const Payment = mongoose.model("Payment", paymentsSchema);

module.exports = Payment;