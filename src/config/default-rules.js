const extensions = require('./extensions.js');
const path = require('path');
const fs = require('fs');

module.exports = [
    {
        name: 'images',
        condition: (file) => extensions.images.includes(file.ext.substring(1)),
        apply: (file) => file.move('__IMAGES')
    }, {
        name: 'videos',
        condition: (file) => extensions.videos.includes(file.ext.substring(1)),
        apply: (file) => file.move('__VIDEOS')
    }, {
        name: 'pdf',
        condition: (file) => extensions.pdf.includes(file.ext.substring(1)),
        apply: (file) => file.move('__PDF')
    }, {
        name: 'archives',
        condition: (file) => extensions.archives.includes(file.ext.substring(1)),
        apply: (file) => {
            const extractedFolder = path.format({
                dir: file.directory,
                name: file.filename
            });
            if (fs.existsSync(extractedFolder)
                && fs.lstatSync(extractedFolder).isDirectory()
                && fs.readdirSync(extractedFolder).length > 0
            ) {
                return file.remove();
            }
            file.move('__ARCHIVES');
        }
    }, {
        name: 'logs',
        condition: (file) => extensions.logs.includes(file.ext.substring(1)),
        apply: (file) => file.move('__LOGS')
    }, {
        name: 'dev',
        condition: (file) => extensions.dev.includes(file.ext.substring(1)),
        apply: (file) => file.move('__DEV')
    }
]