const {app, BrowserWindow} = require('electron')

const createWindow = () => {
    const win = new BrowserWindow(
        {
            width: 500,
            height: 75,
            transparent: true,
            backgroundColor: '#00000000',
            frame: false,
            resizable: false,
            show: false
        }
    )

    win.loadFile('src/renderer/index/index.html')
    win.on('ready-to-show', ()=>{
        win.show()
    })
}

app.whenReady().then(()=>{createWindow()})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
