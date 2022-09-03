const { app, BrowserWindow, Menu, ipcMain, ipcRenderer } = require('electron')
const {Client} = require('whatsapp-web.js')
const { Responder } = require('./src/script/functions')
const path = require('path')
const url = require('url')

const indexView = [
    {
        pathname: path.join(__dirname, './src/view/index.html'),
        protocol: 'file',
        slashes: true
    },
    {
        pathname: path.join(__dirname, './src/view/view2.html'),
        protocol: 'file',
        slashes: true
    },
    {
        pathname: path.join(__dirname, './src/view/view3.html'),
        protocol: 'file',
        slashes: true,
    }
]

const Cliente = new Client();
Cliente.initialize()

function mainWindow() {
    const win = new BrowserWindow({
        width: 1080,
        height: 720,
        resizable: false,
        icon: './src/robot.png',
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.on('close', () => {app.quit()})
    win.loadURL(url.format(indexView[1]) )

    Cliente.on('qr', (qr) => {
        win.loadURL(url.format(indexView[1]))
        setTimeout(() => { win.webContents.send('newQR', qr) }, 3000);        
    })
    Cliente.on('ready', () => {
        win.loadURL( url.format(indexView[0]) )
        setTimeout(() => { win.webContents.send('conect', Cliente.info.pushname) }, 3000)
    })
    Cliente.on('message', async (message) => {
        const msj = await message
        Responder(msj, Cliente)

        if(msj.hasMedia){
            const { mimetype, data } = await message.downloadMedia()
            win.webContents.send('message', msj)
            win.webContents.send('messageMedia', {mimetype, data})
        }else{
            win.webContents.send('message', msj)
        }

    
    })
    ipcMain.on('newComand', (e, newComand) => {
        win.webContents.send('command', newComand)
    })
}

function comandAdds(){
    const win = new BrowserWindow({
        width: 400,
        height: 410,
        resizable: false,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadURL( url.format(indexView[2]) )
    win.setMenu(null)
}
ipcMain.on('AddComand', () =>{
    comandAdds()
})

app.on('ready', () => {
    mainWindow()
})