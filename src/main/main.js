const { marked } = require('marked');
const {app, BrowserWindow} = require('electron')


const createWindow = () => {
    const win = new BrowserWindow(
        {
            width: 450,
            height: 630,
            autoHideMenuBar: true,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        }
    )

    win.loadFile('src/renderer/index/index.html')
    win.on('ready-to-show', ()=>{
        win.show()
    })
    win.webContents.openDevTools()
}

app.whenReady().then(()=>{
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }

})
