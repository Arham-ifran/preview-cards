const { saveImages } = require('../utils/upload')

exports.saveDetails = async (req, res) => {
    try {
        let { image, fileExt } = req.body
        
        if (!image)
            return res.status(400).send({ success: false, message: 'Please provide complete details!' })

        let base64Image = image.split(';base64,').pop();
        let imageUploaded = saveImages(base64Image, fileExt)

        if (!imageUploaded)
            return res.status(400).send({ success: false, message: 'Your data has been could not be saved!' })
        else if (imageUploaded.invalidImageType)
            return res.status(400).send({ success: false, message: 'Image Type not allowed!' })

        return res.status(200).send({ success: true, message: 'Your data has been saved successfully!' })

    }
    catch (err) {
        console.log(err)
        return res.status(400).send({ success: false, message: 'Something went wrong!' })
    }
}