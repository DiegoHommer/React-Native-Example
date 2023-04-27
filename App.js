import { useState } from 'react';
import { StyleSheet, Text, Pressable, View, Button, FlatList } from 'react-native';
import InputName from './components/input';
import RaffleButton from './components/raffleButton';


export default function App() {

  const [chosenIndex, setChosenIndex] = useState(-1);
  const [names, setNames] = useState([]);

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

  // If ternário diminui o tamanho do código e deixa mais fácil a manutenção
  function renderItem(itemData){
    return(
      // If ternario aqui, para definir o estilo do item
      <View style={itemData.index == chosenIndex ? styles.chosenItemContainer : styles.itemContainer}>
        <Pressable 
          // Caixa que contém o nome é pressionável...  
          onPress={() => deleteName(itemData.item.key)}       // Numa pressionada normal, deleta a caixa
          onLongPress={() => deleteNames(itemData.item.key)}  // Numa pressionada longa, deleta todas as caixas exceto a pressionada
          android_ripple={{color: '#210444'}}
        >
          <Text style={styles.itemText}> {itemData.item.text} </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <InputName setNames={setNames} />
      <RaffleButton updateChosenIndex={updateChosenIndex} />
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
