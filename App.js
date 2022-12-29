import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const App = () => {
  const [User, setUser] = React.useState('');
  const [MsgArr, setMsgArr] = React.useState({});
  const [NameEditable, setNameEditable] = React.useState(true);
  const [Username, setUsername] = React.useState('');
  const [Message, setMessage] = React.useState('');

  const saveUser = () => {
    setUsername(User);
    setNameEditable(!NameEditable);
  };

  const sendMessage = () => {
    socket.emit('send_message', {user: Username, message: Message});
    setMessage('');
  };

  socket.on('receive_message', msg => {
    setMsgArr(msg);
  });

  /* React.useEffect(() => {

  }, []); */

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View>
        <Text style={styles.sectionTitle}>Chat App</Text>
        <View style={styles.chatContainer}>
          <TextInput
            editable={NameEditable}
            value={User}
            onChangeText={setUser}
            style={styles.chatBox}
            placeholder="Set username"
          />
          <Button onPress={saveUser} title={NameEditable ? 'Save' : 'Edit'} />
        </View>
        <View style={styles.chatContainer}>
          <TextInput
            value={Message}
            onChangeText={setMessage}
            style={styles.chatBox}
            placeholder="Chat message"
          />
          <Button onPress={sendMessage} title="Send" />
        </View>
        <View style={{marginTop: 8}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 24, fontWeight: '800', width: '30%'}}>
              {MsgArr.user}
            </Text>
            <Text
              style={{
                fontSize: 20,
                width: '70%',
                textAlign: 'justify',
              }}>
              {MsgArr.message}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {padding: 8, width: '100%'},
  chatContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    paddingVertical: 8,
    textAlign: 'center',
  },
  chatBox: {borderColor: 'black', borderWidth: 1, fontSize: 16, width: '80%'},
  highlight: {
    fontWeight: '700',
  },
});

export default App;
