const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
    },
    fullname: {
        type: String,
        index: true
    },
    // avatar: {
    //     type: String,
    //     required: true,
    // },
    boards: [
        {
            type: Schema.Types.ObjectId,
            ref: "Board"
        }
    ],
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email
        },
        "THIS IS SECRET KEY",
        {
            expiresIn: '1d'
        }
    )
}

const User = model("User", userSchema)

module.exports = {
    userSchema,
    User
}