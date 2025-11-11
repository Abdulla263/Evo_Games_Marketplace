const multer = require('multer');
const path = require('path');

// Set up Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

// Create the upload middleware
const upload = multer({ storage: storage });

// Export the upload middleware
module.exports = upload;
