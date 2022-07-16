// app here used to manage life cycle of application
// browser window manage view part manily
const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path')


const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    ipcMain.handle('ping', () => 'pong')
    win.loadFile('index.html')

}

// when app life cycle is ready we call create window to open view
app.whenReady().then(() => {
    createWindow()

    // manage case where app is running but no window open ( mainly for mac os)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Basically this event close app it self in case all windows closed ( used for windows and linux behaviour)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
