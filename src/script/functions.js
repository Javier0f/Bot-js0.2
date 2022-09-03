const fs = require("fs")

function ShowMessage(name, num, from, body){
  const div = document.createElement('div')
  div.classList.add("message")
  div.innerHTML = `
  <h5>de:${name} </h5>
  <h5>de:${num} </h5>
  <h5>chat: ${from === 'status@broadcast'? 'Estados' : from }</h5>
  <p> ${body === "" ? "." : body } </p>
  </div>
  `
  const container = document.getElementById('message.container.center')
  container.appendChild(div)
}
exports.ShowMessage = ShowMessage

function Responder(message, cliente){
  switch (message.body) {
    case '.ping':{
      cliente.sendMessage( message.from, 'Pong!' )
    }
    break;
    
    case '.apagar':{
      cliente.sendMessage( message.from, 'Apagando bot' )
    }
    break;
      
    case 'imitame':{
      cliente.sendMessage( message.from, 'Te imito!!' )
    }
    break;
    
    default:{
      const oldCommand = JSON.parse(fs.readFileSync('./src/script/command.json', {encoding: 'utf-8', flag: 'r'}, (err)=>{console.log(err)}))
      for (const i of oldCommand) {
        if(i.recibir === message.body){
          cliente.sendMessage( message.from, i.enviar)
        }
      }
    }
      break;
  }
}
exports.Responder = Responder

function delCommand(name){
  const oldCommand = JSON.parse(fs.readFileSync('./src/script/command.json', {encoding: 'utf-8', flag: 'r'}, (err)=>{console.log(err)}))

  const newCom = oldCommand.filter( item => item.recibir !== name )
  console.log(newCom)
  fs.writeFileSync('./src/script/command.json', JSON.stringify(newCom))
}

function newComand(obj, create){
  if(obj === undefined){
    const name = create.recibir
    const id = Math.random().toString(36).slice(2)
    const div = document.createElement('div')
    div.classList.add('command')
    div.id = id
    div.innerHTML = `
    <p>${create.recibir}</p>
    
    <button id="${id + 'btn'}">Borar</button>
    `
    const padre = document.getElementById('command-register')
    padre.appendChild(div)
  
    const btn = document.getElementById(`${id + 'btn'}`)
    btn.addEventListener('click', () => {
      div.remove()
      delCommand(name)
    })
      
  }else{
    const name = obj.recibir
    const id = Math.random().toString(36).slice(2)
    const div = document.createElement('div')
    div.classList.add('command')
    div.id = id
    div.innerHTML = `
    <p>${obj.recibir}</p>
    
    <button id="${id + 'btn'}">Borar</button>
    `
    const padre = document.getElementById('command-register')
    padre.appendChild(div)
  
    const btn = document.getElementById(`${id + 'btn'}`)
    btn.addEventListener('click', () => {
      div.remove()
      delCommand(name)
    })
  
    const oldCommand = fs.readFileSync('./src/script/command.json', {encoding: 'utf-8', flag: 'r'}, (err)=>{console.log(err)})
    const comand = JSON.parse(oldCommand)
    comand.push({
      recibir: obj.recibir,
      enviar: obj.responder
    })
    console.log(comand)
    fs.writeFileSync('./src/script/command.json', JSON.stringify(comand))
  }
}
exports.newComand = newComand