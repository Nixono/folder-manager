const path = require("path");

const pathResolver = (p) => {
    if (process.platform === 'linux') {
        const BASE_UNIX = '/mnt/';
        const sepa = p.split(path.win32.sep)
        const newS = [].concat([sepa[0].toLowerCase()], sepa.slice(1))
        return BASE_UNIX + path.posix.join.apply(path.posix, newS).replace(":", "")
    }
    return p.replace('\\', '/');
}

module.exports = {
    pathResolver
}