const { app, BrowserWindow, protocol } = require('electron')

const { session } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 2560 / 2,
        height: 1440 / 2,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity: false, // 允许跨域
            allowRunningInsecureContent: false,
        }
    })

    win.loadURL('http://universe.flyff.com/play')

    // 打开开发者工具
    // win.webContents.openDevTools()
}


app.whenReady().then(() => {

    const webReqFilter = {
        urls: ['*://*/*']
    }

    const isLanguageRedirect = (request) => {
        var fPath = request.url;
        if (fPath.indexOf('/language') >= 0) {
            return true
        }
        return false
    }

    session.defaultSession.webRequest.onBeforeRequest(webReqFilter, (request, callback) => {
        if (isLanguageRedirect(request)) {
            const redirectURL = request.url.replace('/language/en', '/language/cns')
            callback({ redirectURL, cancel: false });
            return
        }
        callback({});
    });


    createWindow()
})