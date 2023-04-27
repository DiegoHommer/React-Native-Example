import { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, View, Button, FlatList } from 'react-native';


//(1)-> aqui nao precisaria de uma variável global, pode acabar dando conflito futuramente se em algum outro arquivo tu quiser criar um arraySize que precise ser global
export default function App() {

  const [chosenIndex, setChosenIndex] = useState(-1);
  const [enteredName, setEnteredName] = useState('');
  const [names, setNames] = useState([]);

  function addName(){
    setNames((names) =>
      [...names, 
        { text: enteredName, key: Math.random().toString() }]);
    setEnteredName('');
  };

  function deleteName(key){
    setNames(names => {
      return names.filter((name) => name.key !== key)
    });
  };

  function deleteNames(key){
    setNames(names => {
      return names.filter((name) => name.key == key)
    });
  };

  function updateChosenIndex(){
    if(names.length !== 0){
      setChosenIndex(Math.floor(Math.random() * names.length));
    };
  };

  //(3) -> nesse caso, poderíamos usar um if ternário, diminuindo um monte o tamanho do código e deixando mais fácil a manutenção
  function renderItem(itemData){
    return(
      //(3)-> if ternario aqui, para definir o estilo do item
      <View style={itemData.index == chosenIndex ? styles.chosenItemContainer : styles.itemContainer}>
        <Pressable 
          /*(4)-> gostei do uso dessse pressable. geralmente é usado o touchable opacity, mas pode ser uma alternativa boa dependendo do contexto. mto bala esse onLongPress tbm  */
          onPress={() => deleteName(itemData.item.key)}
          onLongPress={() => deleteNames(itemData.item.key)}
          android_ripple={{color: '#210444'}}
        >
          <Text style={styles.itemText}> {itemData.item.text} </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder='Nome'
          onChangeText={setEnteredName} //(2)-> colocando direto o setEnteredName
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

/**
 * COMENTÁRIOS
 * Mto bom o app, principalmente a finalidade. Achei mto bala a dinâmica de uso. O estilo sendo feito inteiramente só com o Flex, nao fixan-
 * do nenhum tamanho também é algo mto bom pra responsividade do aplicativo. Shooow d bola.
 * 
 * SUGESTÕES
 * Da pra criar um popupzinho quando for pra excluir um nome. Só pra testar como que funciona um popup, nao que seja 100% necessário 
 * Se quiser se aprofundar na questão da UI com o teclado aberto, dá pra usar o KeyboardAvoindingView e fazer algumas coisas legais
 * https://www.freecodecamp.org/news/how-to-make-your-react-native-app-respond-gracefully-when-the-keyboard-pops-up-7442c1535580/ (principalmente o exemplo de Keyboard Module desse site)
 */

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
