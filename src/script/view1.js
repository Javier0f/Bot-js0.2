const { ipcRenderer } = require('electron')
const fs = require('fs')
const { DownloadIMG } = require('../modules/dwnld')
const { ShowMessage, newComand } = require('../script/functions')

const comandAdd = document.getElementById('comandAdd')

comandAdd.addEventListener('click', () => {
    ipcRenderer.send('AddComand','')
    comandAdd.classList.replace('add-command', 'add-commandClck')
    setTimeout(() => {comandAdd.classList.replace('add-commandClck', 'add-command')},100)
})

ipcRenderer.on('messageMedia', (e, media) => {
    console.log(media)

    if(media.mimetype === 'image/jpeg'){
      DownloadIMG(media.data)
    }
})
const comand = JSON.parse(fs.readFileSync('./src/script/command.json', {encoding: 'utf-8', flag: 'r'}, (err)=>{console.log(err)}))
for (const key of comand) {
    console.log(key)
    newComand(undefined,key)   
}

ipcRenderer.on('message', (e, message) => {
    console.log(message)
    console.log('Mensaje de: ', message._data.notifyName )
    ShowMessage(message._data.notifyName, message.author, message.from, message.body)
})

ipcRenderer.on('command', (e, Newcommand) => {
    newComand(Newcommand)
})