const fs = require('fs')
const path = require('path');
const uploadsDir = './src/uploads/'
const imagesDir = `${uploadsDir}images/`
const { allowedImageTypes } = require('../../config/vars')

exports.saveImages = (file, fileExt) => {
    try {
        if (allowedImageTypes.indexOf(fileExt) <= -1)
            return { invalidImageType: true }

        let fileName = `image-${Date.now()}.${fileExt}`

        // make uploads directory if do not exist
        if (!fs.existsSync(uploadsDir))
            fs.mkdirSync(uploadsDir)

        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir)
        }

        let filePath = path.join(__dirname, `../uploads/images/${fileName}`)
        fs.writeFileSync(filePath, file, { encoding: 'base64' })

        return true
    }
    catch (err) {
        console.log(err)
        return false
    }
}

