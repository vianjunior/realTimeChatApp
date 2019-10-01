import axios from 'axios'

export function gravarMensagem(msg, socket) {
  axios.post('http://10.1.1.154:3000/gravarMensagem', dados = {mensagem: msg})
    .then(resp => {
      if (resp.data == 'Sucesso') {
        socket.emit("mensagem", msg)
      }
    })
}