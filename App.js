import { useState } from 'react';
import { StyleSheet, Text, Button, Pressable, View, Modal, FlatList } from 'react-native';
import InputName from './components/input';
import RaffleButton from './components/raffleButton';

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);
  const [removeKey, setRemoveKey] = useState(-1);
  const [chosenIndex, setChosenIndex] = useState(-1);
  const [names, setNames] = useState([]);

  // Função que deleta um nome do array com chave igual a variável key de entrada (usando filter)
  function deleteName(){
    if((chosenIndex !== -1) && removeKey === names[chosenIndex].key){ // Se o nome sorteado é o nome a ser removido
      setChosenIndex(-1); // chosenIndex vai para -1 (usuário deve sortear novamente)
    }
    setModalVisible(!modalVisible); // Diminui a janela de pop-up
    setNames(names => {
      return names.filter((name) => name.key !== removeKey)
    });
  };

  // Função que deleta todos os nomes do array com chave diferente da variável key de entrada (usando filter)
  function deleteNames(key){
    setChosenIndex(-1);
    setNames(names => {
      return names.filter((name) => name.key == key)
    });
  };

  // Função que sorteia um número aleatório entre 0 e names.length (tamanho do array) e guarda esse número em chosenIndex
  function updateChosenIndex(){
    if(names.length !== 0){
      setChosenIndex(Math.floor(Math.random() * names.length));
    };
  };

  // If ternário diminui o tamanho do código e deixa mais fácil a manutenção
  function renderItem(itemData){
    return(
      // If ternario aqui, para definir o estilo do item (se o nome é o sorteado, pinta sua caixa de violeta ao invés de roxo)
      <View style={itemData.index == chosenIndex ? styles.chosenItemContainer : styles.itemContainer}>
        <Pressable 
          // Caixa que contém o nome é pressionável...  
          onPress={() => {
            setModalVisible(!modalVisible);
            setRemoveKey(itemData.item.key);
          }}          
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

      {/* Pop-Up que aparece quando algum dos nomes é pressionado */}
      <Modal 
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.popUpCentralizado}>
          <View style={styles.modalContainer}>
             {/* Dois botões, um para deletar o nome pressionado, outro para voltar a tela inicial*/}
            <Button 
              color='black'
              title='remover nome' 
              onPress={() => deleteName()} 
            />
            <Button 
              color='black' 
              title='voltar' 
              onPress={() => setModalVisible(!modalVisible)} 
            />  
          </View>
        </View>
      </Modal>

      {/* InputName => Caixa de input de nome e botão para adicionar nome */}
      <InputName setNames={setNames} /> 

      {/* RaffleButton => Botão de sorteio de nome */}
      <RaffleButton updateChosenIndex={updateChosenIndex} />

        {/* FlatList renderiza os nomes (e seus respectivos containers) do array de nomes */}
      <View style={styles.namesContainer}>
        <FlatList
          data={names}
          renderItem={(itemData) => renderItem(itemData)}
        />
      </View>
    </View>
  );
}

/*
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
  popUpCentralizado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderWidth: 2,
    borderColor: 'white',
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
