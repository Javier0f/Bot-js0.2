const qrcode = require('qrcode')
const {ipcRenderer} = require('electron')
const loader = document.getElementById('loader-content')
const canvas = document.getElementById('canvas')

ipcRenderer.on('newQR', (e, qr) => {
    loader.remove()

    qrcode.toCanvas( canvas, qr, err => console.log(err))
})