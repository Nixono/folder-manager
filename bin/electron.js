const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

const FileManager = require('../src/fileManager/FileManager');
const { pathResolver } = require('../src/fileManager/utils/utils.js');

let folder = undefined;

function createWindow() {
    // Create the browser window.
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    // and load the index.html of the app.
    window.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    // Open the DevTools.
    if (isDev) {
       window.webContents.openDevTools({ mode: 'detach' });
    }

    ipcMain.on('open_directory_dialog', (event, arg) => {
        let pathArray = dialog.showOpenDialogSync({
            title: 'Which folder do you want to sort ?',
            properties: ['openDirectory'],
            buttonLabel: 'Folder choice',
        });
        if (pathArray !== undefined) {
            event.returnValue = pathArray[0];
            folder = pathArray[0];
        }
    });

    ipcMain.on('set_folder', (event, arg) => {
        if (folder !== undefined) {
            console.log(`Path : ${pathResolver(folder)}`);
            FileManager.apply(pathResolver(folder));
        } else {
            console.warn('Path is not set, do nothing');
        }
    });

    ipcMain.on('create_condition', (event, arg) => {
        console.log("on create_condition");
        console.log(event);
        console.log(arg);
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
