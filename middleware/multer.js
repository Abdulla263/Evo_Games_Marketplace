const multer = require('multer');
const path = require('path');


// Set up Multer storage
const storage = multer.memoryStorage();

// Create the upload middleware
const upload = multer({ storage: storage });


// Export the upload middleware
module.exports = upload;
