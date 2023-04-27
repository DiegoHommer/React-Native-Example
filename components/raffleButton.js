import { StyleSheet, View, Button } from 'react-native';

function RaffleButton(props){
    return(
        <View style={styles.buttonContainer}> 
            <Button
                title='Sortear nome'
                color= '#7F00FF'
                onPress={props.updateChosenIndex}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 5,
    },
});

export default RaffleButton;