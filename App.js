import { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View, Button, FlatList} from 'react-native';

let arraySize = 0;

export default function App() {

  const [chosenIndex, setChosenIndex] = useState(-1);
  const [enteredName, setEnteredName] = useState('');
  const [names, setNames] = useState([]);

  function updateName(enteredNameText){
    setEnteredName(enteredNameText);
  };

  function addName(){
    arraySize = arraySize + 1;
    setNames((names) =>
      [...names, 
        { text: enteredName, key: Math.random().toString() }]);
    setEnteredName('');
  };

  function deleteName(key){
    arraySize = arraySize - 1;
    setNames(names => {
      return names.filter((name) => name.key !== key)
    });
  };

  function deleteNames(key){
    arraySize = 1;
    setNames(names => {
      return names.filter((name) => name.key == key)
    });
  };

  function updateChosenIndex(){
    if(arraySize !== 0){
      setChosenIndex(Math.floor(Math.random() * arraySize));
    };
  };

  function renderItem(itemData){
    if(itemData.index == chosenIndex){
      return(
        <View style={styles.chosenItemContainer}>
          <Pressable 
            onPress={() => deleteName(itemData.item.key)}
            onLongPress={() => deleteNames(itemData.item.key)}
            android_ripple={{color: '#210444'}}
          >
            <Text style={styles.itemText}> {itemData.item.text} </Text>
          </Pressable>
        </View>
      );
    }else{
      return(
        <View style={styles.itemContainer}>
          <Pressable 
            onPress={() => deleteName(itemData.item.key)}
            onLongPress={() => deleteNames(itemData.item.key)}
            android_ripple={{color: '#210444'}}
          >
            <Text style={styles.itemText}> {itemData.item.text} </Text>
          </Pressable>
        </View>
      );
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Nome'
          onChangeText={updateName}
          value={enteredName}
        />
        <Button
          title='Enter'
          color= '#7F00FF'
          onPress={addName}
        />
      </View>

      <View style={styles.buttonContainer}>
      <Button
          title='Sortear nome'
          color= '#7F00FF'
          onPress={updateChosenIndex}
      />
      </View>
      <View style={styles.namesContainer}>
        <FlatList
          data={names}
          renderItem={(itemData) => renderItem(itemData)}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    paddingVertical: 2,
    paddingLeft: 5,
    marginRight: 3,
    width: '70%',
  },
  buttonContainer: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 5,
  },
  namesContainer: {
    flex: 5,
  },
  itemContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    backgroundColor: '#7F00FF',
  },
  chosenItemContainer: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'violet',
  },
  itemText: {
    color: 'white',
  },
 
});
