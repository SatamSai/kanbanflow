const { Schema, model } = require('mongoose')

const memberSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role: {
        type: String,
        enum: ["owner", "admin", "editor", "contributor", "viewer", "guest"],
        default: "viewer",
        required: true,
    }
});

const boardScheme = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        index: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    columns: [
        {
            type: String,
            required: true
        }
    ],
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
    members: [memberSchema],
}, { timestamps: true })


boardScheme.post('findOneAndDelete', async (doc) => {
    if (doc) {
        const User = require('./user.model').User
        try {
            await User.updateMany(
                {
                    boards: doc._id
                },
                {
                    $pull: {
                        boards: doc._id
                    }
                }
            )
        }
        catch (e) {
            console.log(e)
        }
    }
})

const Board = model("Board", boardScheme)

module.exports = {
    boardScheme,
    Board
}