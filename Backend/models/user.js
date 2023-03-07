const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [1,"Şifre en az 1 karakter olmalıdır!"]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;