import { useState } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';

function InputName(props){
    const [enteredName, setEnteredName] = useState('');

    function addName(){
        props.setNames((names) =>
          [...names, 
            { text: enteredName, key: Math.random().toString() }]);
        setEnteredName('');
    };

    return(
        <View style={styles.inputContainer}>
            <TextInput
            style={styles.textInput}
            placeholder='Nome'
            onChangeText={setEnteredName} 
            value={enteredName}
            />
            <Button
            title='Enter'
            color= '#7F00FF'
            onPress={addName}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
    });


export default InputName;
