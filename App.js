import * as React from 'react';
import { useState,useEffect } from 'react';
import { Text, View, Button, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const API = "https://jsonplaceholder.typicode.com/todos";

/* Desctructure the "item" */
const renderToDo = ({item}) => <Todo id={item.id} userId={item.userId} t={item.title} c={item.completed.toString()}/>;

/* The templete of a list */
const Todo = (props) =>(
  <View style={styles.item}>
    <Text style={styles.text}>Id: {props.id}</Text>
    <Text style={styles.text}>User Id: {props.userId}</Text>
    <Text style={styles.text}>To-do title: {props.t}</Text>
    <Text style={styles.status}>Status: {props.c}</Text>
  </View>
)

export default function App() {

  const [data,setData] = useState([]);
  const [status,setStatus] = useState(" ");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(()=>{
    fetch(API)
      .then((res)=>{
        return res.json()
      })
      .then((json)=>{
        setData(json);
        setFilteredData(json);
      })
      .catch((err)=>{
        console.log(err.message)
      });
  },[]);

  const filter = (value) =>{
    setStatus(value);
    if(value ==="Yes"){
      setFilteredData(data.filter(item => item.completed.toString()=="true"));
    }else{
      setFilteredData(data.filter(item => item.completed.toString()=="false"));
    }
  }

  return (
    <View>
    <Text>Your completion status is: {status}</Text>
    <Picker selectedValue={status} onValueChange={filter}>
      <Picker.Item label="Yes" value="Yes"/>
      <Picker.Item label="No" value="No"/>
    </Picker>

    <FlatList style={styles.todoList}
      data={filteredData}
      renderItem={renderToDo}
      keyExtractor={item=>item.id}>
      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    borderWidth:1,
    padding:10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "pink",
    margin: 10,
  },
  todoList:{
    alignContent:'Stretch',
    width:"100%",
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "yellow",
    }
});
