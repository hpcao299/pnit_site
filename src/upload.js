require('dotenv').config();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const url = process.env.DATABASE_URL;

const storage = new GridFsStorage({
    url,
    file: (req, file) => {
        const username = req.params.username; // Assuming the username is in the route parameter
        const imageType = file.mimetype.split('/')[1]; // Extract image type

        // If it is an image, save to uploads bucket
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            return {
                bucketName: 'uploads',
                filename: `${Date.now()}_${username}.${imageType}`,
            };
        } else {
            // Otherwise save to default bucket
            return `${Date.now()}_${username}.${imageType}`;
        }
    },
});

const upload = multer({ storage });

module.exports = { upload };
