import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    pic: {type: String, required: true, default:"avatar.jpg"}
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema)