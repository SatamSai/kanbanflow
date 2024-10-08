const { Schema, model } = require("mongoose");


const UrlSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectURL: {
        type: String,
        required: true,
    },
    visitHistory: [
        {
            timestamp: {
                type: Number
            }
        }
    ]
}, {
    timestamps: true
})

const URL = model("url", UrlSchema)

module.exports = URL