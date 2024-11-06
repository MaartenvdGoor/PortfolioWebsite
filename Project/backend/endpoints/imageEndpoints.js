const express = require('express');
const path = require("path");
const router = express.Router();
const fileUpload = require('express-fileupload');
const fs = require('fs');

router.use(fileUpload())


router.get('/:project/:imageName', (req, res) => {
    let imagePath = path.join('/Project/backend/images',req.params.project, req.params.imageName)
    if (fs.existsSync(imagePath)) {
        res.status(200).sendFile(imagePath)
    }
    else{
        res.status(404).send()
    }

})



router.post('/upload', (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'No files were uploaded.' });
    }


    const uploadedFile = req.files.file; // 'file' should match the name used in FormData
    const projectName = req.body.projectName; // Access project name from the body

    // Define the upload path
    const uploadDir = path.join('/Project/backend/images', projectName);
    const uploadPath = path.join(uploadDir, uploadedFile.name);
    console.log("uploadPath = ",uploadDir)

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory recursively if it doesn't exist
    }

    uploadedFile.mv(uploadPath, function (err) {
        if (err) {
            return res.status(500).json({ message: 'Error saving file', error: err });
        }

        res.status(200).json({ message: 'File uploaded successfully', fileName: uploadedFile.name });
    });
});

module.exports = router