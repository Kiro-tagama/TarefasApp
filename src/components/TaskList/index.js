import React from 'react';
import { Text, View,StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function TaskList({data, deleteItem, editItem}) {
 return (
   <View style={styles.container}>
     <TouchableOpacity 
      style={{marginRight:10}}
      onPress={()=>deleteItem(data.key)}
     >
      <Feather name="trash" size={20} color="black" />
     </TouchableOpacity>

     <View style={{flex:1}}>
       <TouchableWithoutFeedback onPress={()=>editItem(data)}>
         <Text style={{fontSize:16}}>{data.nome}</Text>
       </TouchableWithoutFeedback>
     </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    marginVertical:5,
    padding:10,
    backgroundColor:'#aaa',
    borderRadius:10,
    alignItems:'center',
    flex:1
  }
})