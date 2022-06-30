import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {Text, Input, Icon, Button} from 'react-native-elements';
import {AutenticacaoContext} from '../../context/AutenticacaoContext';
import Carregamento from '../../components/Carregamento';
import App from '../../App';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const {login} = useContext(AutenticacaoContext);
  const [visible, setVisible] = useState(false);

  const handleLogin = async (email: string, senha: string) => {
    console.log(`Email: ${email} - Senha: ${senha}`);
    setVisible(true);
      

    const respostaLogin = await login(email, senha);
    if (!respostaLogin) {
      setVisible(false);
      Alert.alert('Erro', '', [
        {text: 'Ok'},
        {text: 'Não foi possivel realizar o login.'},
      ]);
    } else {
      setVisible(false);
      navigation.navigate('HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto_entrada}>{'Bem-vindo ao mundo Pet'}</Text>
      <Input
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
        leftIcon={
          <Icon name="user" color="pink" type="font-awesome" size={26} />
        }
        inputStyle={styles.inputs}
        placeholderTextColor={'pink'}
      />
      <Input
        placeholder="Senha"
        onChangeText={setSenha}
        value={senha}
        leftIcon={
          <Icon name="key" color="pink" type="font-awesome" size={26} />
        }
        inputStyle={styles.inputs}
        placeholderTextColor={'pink'}
        secureTextEntry
      />

      <Button
        title="Entrar"
        onPress={() => handleLogin(email, senha)}
        titleStyle={styles.titulobotao}
        buttonStyle={styles.botaostyle}
      />
      <Carregamento visible={visible} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bd0b5e',
    padding: 16,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  texto_entrada: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 60,
    textAlign: 'center',
    color: 'pink',
  },
  inputs: {
    color: 'white',
  },
  titulobotao: {
    color: '#0d0d0e',
    margin: 5,
    fontSize: 25,
  },
  botaostyle: {
    backgroundColor: 'pink',
    borderRadius: 50,
  },
});

export default Login;
