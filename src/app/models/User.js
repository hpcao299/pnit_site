const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true, maxLength: 60, trim: true },
        username: { type: String, required: true, unique: true, trim: true },
        school: { type: String, trim: true },
        class: { type: String, trim: true },
        password: { type: String, required: true },
        phone: { type: String, trim: true },

        bio: { type: String, maxLength: 120, trim: true },
        image_url: { type: String },

        facebook_url: { type: String, trim: true },
        instagram_url: { type: String, trim: true },
        tiktok_url: { type: String, trim: true },
        github_url: { type: String, trim: true },
        discord_url: { type: String, trim: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', User);
