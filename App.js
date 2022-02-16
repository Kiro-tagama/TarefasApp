import React, { useRef, useEffect, useState } from 'react';
import { Keyboard,StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';

import Login from "./src/components/Login";
import TaskList from './src/components/TaskList'

import firebase from "./src/services/firebaseConnection";
// firebas@^8.8.1

import { Feather } from '@expo/vector-icons';

export default function App() {

  const [user,setUser]=useState(null)
  const [newTask,setNewTask]=useState('')
  const inputRef = useRef(null)
  const [key, setKey]=useState('')

  const [task, setTask]=useState([])

  useEffect(()=>{
    function getUser(){
      if (!user) {
        return
      }
      firebase.database().ref('tarefas').child(user).once('value',(snapshot)=>{
        setTask([])
        snapshot?.forEach((childData)=>{
          let data={
            key:childData.key,
            nome:childData.val().nome
          }
          setTask(oldTask=> [...oldTask, data])
        })
      })
    }
    getUser()
  },[user])

  function handleAdd() {
    if(newTask===''){
      return
    }

    if(key!==''){
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome:newTask
      })
      .then(()=>{
        const taskIndex=task.findIndex(item=>item.key===key)
        const taskClone=task
        taskClone[taskIndex].nome=newTask
        setTask([...taskClone])

      })
      Keyboard.dismiss()
      setNewTask('')
      setKey('')
      return
    }

    let tarefas= firebase.database().ref('tarefas').child(user)
    let chave=tarefas.push().key

    tarefas.child(chave).set({
      nome:newTask
    })
    .then(()=>{
      const data={
        key:chave,
        nome:newTask
      }
      setTask(oldTask=> [...oldTask, data])
      //pega as tarefas antigas

      Keyboard.dismiss()
      setNewTask('')
    })
  }
  function handleDelete(key) {
    firebase.database().ref('tarefas').child(user).child(key).remove()
    .then(()=>{
      const findTask=task.filter(item=>item.key !== key)
      setTask(findTask)
    })
  }
  function handleEdit(data) {
    setNewTask(data.nome)
    setKey(data.key)
    inputRef.current.focus()
    
  }
  function cancelEdit(params) {
    setKey('')
    setNewTask('')
    Keyboard.dismiss()
  }

  if(!user){
    return <Login changeStatus={(user)=>setUser(user)}/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          placeholder='O que vai fazer hoje?'
          value={newTask}
          onChangeText={(text)=>setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity onPress={handleAdd}>
          <Text style={styles.add}>+</Text>
        </TouchableOpacity>
      </View>
      {key.length>0 && (
        <View >
          <TouchableOpacity onPress={cancelEdit} style={{flexDirection:'row',alignItems:'center',justifyContent: 'center',marginVertical:10}}>
            <Feather name="x-circle" size={24} color="red" />
          <Text style={{marginLeft:5,color:'red'}}>Você está editando uma tarefa!</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={task}
        keyExtractor={item=>item.key}
        renderItem={({item})=>(
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit}/>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    padding:20,
  },
  viewInput:{
    flexDirection:'row',
    padding:10,
    marginTop:20,
    marginBottom:10,
    borderWidth:0.5,
    borderRadius:15,
    backgroundColor:'#fff'
  },
  input:{
    flex:1,
    fontSize:16
  },
  add:{
    backgroundColor:'#333',
    color:'#fff',
    paddingHorizontal:12,
    paddingVertical:2,
    borderRadius:50,
    fontWeight:'bold',
    fontSize:25,
    marginLeft:10
  }
});
