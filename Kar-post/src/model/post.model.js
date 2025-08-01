import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'published', 'failed'],
        default: 'scheduled'
    },
    publishAt: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export const Post = mongoose.model('Post', postSchema);