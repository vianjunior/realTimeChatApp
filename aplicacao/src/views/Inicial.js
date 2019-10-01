import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Input } from 'react-native-elements'
import io from 'socket.io-client'
import MeasureText from 'react-native-measure-text'

import { gravarMensagem }  from '../functions/EnviarMensagem'

export default class Inicial extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      chatMessage: '',
      chatMessages: [],
      messageWidth: 0
    }
  }

  componentDidMount() {
    this.socket = io("http://10.1.1.154:3000")
    this.socket.on("mensagem", msg => {
      this.setState({ chatMessages: [...this.state.chatMessages, msg]})
    })
  }

  enviarMensagem() {
    if (this.state.chatMessage){
      gravarMensagem(this.state.chatMessage, this.socket)
      this.setState({ chatMessage: '' })
    }
  }

  _onTextContentSizeChange = (evento) => {
    this.setState({
      messageWidth: Math.min(evento.nativeEvent.contentSize.width, 100)
    })
  }

  render(){

    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <View 
        key={chatMessage}
        style={styles.mensagens}
        onContentSizeChange={this._onTextContentSizeChange}
      >
        <Text style={styles.textoMensagem} multiline={true}>{chatMessage}</Text>
      </View>
    ))

    return (
      <View 
        style={styles.container}
      >
        <View style={styles.Input}>
          <Input
            inputContainerStyle={{ borderBottomWidth: 0 }}
            autoFocus={true}
            value={this.state.chatMessage}
            onSubmitEditing={() => this.enviarMensagem()} 
            onChangeText={(chatMessage) => {
              this.setState({ chatMessage })
            }} 
          />
        </View>
        <View style={styles.chatHistory}>
          {chatMessages}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column-reverse',
    backgroundColor: '#48dbfb',
  },
  Input: {
    flex:0.065,
    justifyContent: 'flex-end',
    marginBottom: 15,
    marginTop: 15,
    backgroundColor:'#f1f2f6',
    borderWidth: 0.3,
    marginHorizontal: 10,
    borderRadius: 20
  },
  chatHistory: {
    flex: 0.922
  },
  mensagens: {
    flex: 0.05,
    margin: 5,
    alignSelf: 'flex-end',
    borderRadius: 8,
    backgroundColor:'#f1f2f6',
    alignItems: 'flex-end',
    width: 200
  },
  textoMensagem: {
    position: 'absolute',
    fontSize: 14,
  }
});
