const fs = require('fs');
const path = require('path');
const rules = require('./config/default-rules.js');

const _File = require('./actions/File.js')

class FileManager {

    constructor(folder) {
        if (!fs.existsSync(folder)) {
            throw new Error(`Folder "${folder}" does not exist`);
        }
        this.folder = folder;
    }

    getAllFiles() {
        return fs.readdirSync(this.folder).filter(file => fs.statSync(path.join(this.folder, file)).isFile()).map(f => new _File(path.join(this.folder, f)));
    }

    static apply(folder) {
        const fileManager = new FileManager(folder);
        fileManager.getAllFiles().forEach(file => {
            if (file.isCopy()) {
                file.remove();
            } else {
                const rule = rules.find(r => r.condition(file));
                if (rule) {
                    rule.apply(file);
                }
            }
        });
    }

}

module.exports = FileManager;