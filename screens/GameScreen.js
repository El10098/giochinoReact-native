/**Qui uso l'Hook useEffect, che serve semplicemente a performare i side effects di una funzione
 *Può prendere due argomenti:
 1. Il primo è obbligatorio, è una funzione
 2. Il secondo è facoltativo ed è una dependency
 */
import {useState, useEffect} from 'react';

import { View, Text, StyleSheet } from "react-native";

import Title from "../components/ui/Title";
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';

function generateRandomNumber(min, max, exclude){
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if(rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  }
  else{
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100; 

function GameScreen({userNumber, onGameOver}) {
  const initialGuess = generateRandomNumber(minBoundary, maxBoundary, userNumber);
  const [currentGuess, setCurrentGuess] = useState();

  useEffect(() => {
    if(currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction){
    if((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)){
      Alert.alert("Don't lie!", 'You know thwt is wrong', [
        {text: 'Sorry!', style: 'cancel'}
      ]);
      return;
    }
    else if(direction === 'lower') {
      maxBoundary = currentGuess - 1;
      const newRenderNumber = generateRandomNumber(minBoundary, maxBoundary, currentGuess);
    }
    else {
      minBoundary = currentGuess +1;
      const newRenderNumber = generateRandomNumber(minBoundary, maxBoundary, currentGuess); 
    }
    const newRenderNumber = generateRandomNumber(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRenderNumber);
  }
  return (
    <View>
      <Card>
        <Title>'Opponent's Guess'</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View>
          <Text>Higher or Lower?</Text>
        </View>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>+</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>-</PrimaryButton>
        </View>
      </Card>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  }
});
