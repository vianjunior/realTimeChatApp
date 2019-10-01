const express = require("express")
const compression = require('compression')
const bodyParser = require('body-parser')
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io").listen(server)
const Firebird = require('node-firebird')

const configuracoes = require('./config/Config')

const port = configuracoes.conf.portaServidor

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(compression())
app.use(express.static('public'))

io.on("connection", socket => {
  console.log("Usuário conectado!")
  socket.on("mensagem", msg => {
    console.log(msg + ' inserida com sucesso no banco de dados.')
    io.emit("mensagem", msg)
  })
})

app.post('/gravarMensagem', (request, response) => {
  let mensagem = request.body.mensagem
  let cont = 0

  Firebird.attach(configuracoes.conf.options, (err, db) => {
    let sql = `INSERT INTO MENSAGEM (DEMENSAGEM) VALUES (?)`
    db.query(sql, [mensagem], (errQuery, data) => {
      if (!errQuery) {
          response.send('Sucesso')
          db.detach(); 
      } else {
          response.send('Erro')
          console.log('Erro!')
          return
      }
    })
  })  
})

server.listen(port, () => console.log("Servidor conectado à porta " + port))