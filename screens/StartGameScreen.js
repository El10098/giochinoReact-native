import { View, TextInput, StyleSheet, Alert, Text } from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/ui/PrimaryButton";
import { Colors } from "react-native/Libraries/NewAppScreen";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler(enteredText) {
    //Converto il valore in input in un number
    //NB in JS questo è un boolean qui no
    const chosenNumber = parseInt(enteredText);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //Alert è un object che ha i metodi prompt e alert
      Alert.alert(
        "Invalid Number!",
        "Number has to between 0 and 99",
        //Il button dell'alert è un array che contiene almeno un oggetto
        [{ text: "okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    onPickNumber(chosenNumber);
    console.log("Valid number!");
  }
  //L'inizio del codice html deve essere sulla stessa linea del return,
  //A meno che il testo non si metta tra parentesi tonde
  return (
    <View>
      <Title>Guess my NumberContainer</Title>
      <View style={styles.outerContainer}>
        <Text>Enter a Number</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber}
        />
        <View style={styles.innerContainer}>
          <View style={styles.buttonSpace}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonSpace}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: 'center'
  },
  innerContainer: {
    flexDirection: "row",
  },
  buttonSpace: {
    flex: 1,
  },
  instructionText: {
    color: Colors.primary500,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    color: "#ddb52f",
    borderBottomWidth: 2,
    marginVertical: 8,
    fontWeight: "bold",
  },
});
