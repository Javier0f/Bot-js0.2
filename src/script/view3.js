const { ipcRenderer } = require("electron")

const inputR = document.getElementById('inputR')
const inputS = document.getElementById('inputS')
const button = document.getElementById('btn')

button.addEventListener('click', () => {
    const command = {
        recibir : inputR.value || '',
        responder : inputS.value || ''
    }

    if(command.recibir.trim() === '' || command.responder.trim() === ''){
        alert('rellena ambos campos para continuar')
    }else{
        ipcRenderer.send('newComand', command)
    }

})