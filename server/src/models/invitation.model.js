const { Schema, Types, model } = require("mongoose");

const invitationSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    generatedBy: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    board: {
        type: Types.ObjectId,
        ref: 'Board'
    },
    role: {
        type: String,
        enum: ["owner", "admin", "editor", "contributor", "viewer", "guest"],
        default: "viewer",
        required: true,
    }
}, {
    timestamps: true
})

const Invitation = model('Invitation', invitationSchema)

module.exports = {
    Invitation,
    invitationSchema
}