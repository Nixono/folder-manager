const path = require('path');
const fs = require('fs');

const COPY_FILE_NAME = '- Copie';
const COPY_NUMBER_REGEX = /\([0-9]*\)$/;

class File {
    constructor(filepath) {
        this.path = filepath;
        this.directory = path.dirname(filepath);
        this.ext = path.extname(filepath);
        this.filename = path.basename(filepath, this.ext);
    }

    isCopy() {
        const endWithCopy = this.filename.endsWith(COPY_FILE_NAME);
        const endWithNumber = this.filename.match(COPY_NUMBER_REGEX);
        if (endWithCopy) {
            const originalFileName = this.filename.replace(COPY_FILE_NAME, '').trim();
            const originalPath = path.format({
                dir: this.directory,
                name: originalFileName,
                ext: this.ext
            });
            if (fs.existsSync(originalPath)) {
                return fs.statSync(originalPath).size === fs.statSync(this.path).size;
            }
        } else if (endWithNumber) {
            const originalFileName = this.filename.replace(COPY_NUMBER_REGEX, '').trim();
            const originalPath = path.format({
                dir: this.directory,
                name: originalFileName,
                ext: this.ext
            });
            if (fs.existsSync(originalPath)) {
                return fs.statSync(originalPath).size === fs.statSync(this.path).size;
            }
        }
        return false;
    }

    remove() {
        return fs.rmSync(this.path);
    }

    createFolder(folder) {
        if (!fs.existsSync(path.join(this.directory, folder))) {
            return fs.mkdirSync(path.join(this.directory, folder));
        }
        return false;
    }

    move(folder) {
        this.createFolder(folder);
        const newPath = path.format({
            dir: path.join(this.directory, folder),
            name: this.filename,
            ext: this.ext
        });
        return fs.renameSync(this.path, newPath);
    }

}

module.exports = File;


