import React, {useState} from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput,  TouchableOpacity } from 'react-native';

import firebase from "../../services/firebaseConnection";

export default function Login({changeStatus}) {
  const [type, setType]= useState('login')

  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')

  function handleLogin(){
    if (type === 'login') {
      //login
      const user=firebase.auth().signInWithEmailAndPassword(email,password)
      .then((user)=>{
        changeStatus(user.user.uid)
      })
      .catch((error)=>{
        console.log(error)
        alert('Erro ao logar')
        return
      })
    }else{
      //cadastro
      const user=firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((user)=>{
        changeStatus(user.user.uid)
      })
      .catch((error)=>{
        console.log(error)
        alert('Erro ao cadastrar')
        return
      })
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:25,fontWeight:'bold',marginBottom:20}}>
      {type === 'login'? 'Login com tonica' : 'Cadastrar'}
      </Text>
      <TextInput
        placeholder='Email'
        style={styles.input}
        value={email}
        onChangeText={(text)=>setEmail(text)}
        keyboardType='email-address'
        autoComplete='email'
      />
      <TextInput
        placeholder='Senha'
        style={styles.input}
        value={password}
        onChangeText={(text)=>setPassword(text)}
        autoComplete='password'
      />

      <TouchableOpacity onPress={handleLogin}>
        <Text style={[styles.bt1 ,{backgroundColor: type === 'login'? '#3ea6f2' : '#141414'}]}>
          {type === 'login'? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> setType(type => type ==='login'? 'cadastrar':'login')}>
        <Text style={styles.bt2}>
          {type === 'login'? 'Criar uma conta' : 'Já possuo uma conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding:15,
    paddingTop:100,
  },
  input:{
    backgroundColor:'#fff',
    borderWidth:2,
    borderColor:'#000',
    padding:10,
    marginVertical:7,
    borderRadius:5,
    fontSize:18
  },
  bt1:{
    padding:10,
    marginVertical:7,
    borderRadius:5,
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20
  },
  bt2:{
    padding:10,
    marginVertical:20,
    borderRadius:5,
    textAlign:'center',
    fontSize:18
  }
});
