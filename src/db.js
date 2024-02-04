require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);

        console.log('Connect to MongoDB successfully!');
    } catch (error) {
        console.log(error);
        console.log('Connect to MongoDB failed!');
    }
}

function gfs() {
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
}

module.exports = { connect, gfs };
