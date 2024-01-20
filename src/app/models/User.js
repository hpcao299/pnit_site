const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, required: true },
        username: { type: String, required: true },
        school: { type: String, required: true },
        phone: { type: String },
        class: { type: String },

        description: { type: String },
        image_url: { type: String },

        facebook_url: { type: String },
        instagram_url: { type: String },
        tiktok_url: { type: String },
        github_url: { type: String },
        discord_url: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
