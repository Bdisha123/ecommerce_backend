const mongoose=require("mongoose");
const validator=require("validator");

const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const crypto=require("crypto")
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 30,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "enter a valid email"]
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password=await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJWTToken=function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// compare password
userSchema.methods.comparePassword=async function(password) {
    return await bcrypt.compare(password, this.password)
}

//generating password reset token
userSchema.methods.getResetPasswordToken=async function() {
    // Generating Token
    const resetToken=await crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken=crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire=Date.now()+15*60*1000;

    return await resetToken;
};


module.exports=mongoose.model("User", userSchema);