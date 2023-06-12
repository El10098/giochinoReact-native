/**useState è un Hook, una funzionalità retroattiva che è stata introdotta da React 16.8
 * Prima degli Hooks bisognava scrivere una classe apposita, per accedere agli stati con gli Hook non bisogna più fatlo
 * Vanno richiamati al Top Level e NON in loop, if/else, nested function, funzioni JS non React,
 * e nel return
 * 
 * Possono essere richiamati nelle React function components o nei custom Hooks
 * 
 * Con l'Hook useState() mi salvo il valore iniziale ritornando due valori distinti:
 * 1. Il valore iniziale;
 * 2. La funzione che mi aggiorna quel valore. 
 */
import { useState } from "react";

//Components come in React i component vengono da delle classi che vengono importate
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";

//Questo va installato da terminale
import { LinearGradient } from "expo-linear-gradient";

//Custom Components
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import Card from "./components/ui/Card;"

export default function App() {

  //Mi istanzio un array bidimensionale che prende due valori, il velore iniziale e la funzione che è richiamata per quel valore
  //Con UseState mi salvo il vecchio numero e me lo aggiorno
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);

  //
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  }

  //Il mio custom component è salvato in una variabile screen.
  //Ho salvato il valore del custom component in una variabile
  // StartGameScreen ha la proprietà onPickNumber che viene settata sulla function pickedNumberHandler
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  //Se userNumber è true (Ma quando è true?)
  if (userNumber) {
    //La variabile screen prende il valore del custom component GameScreen che ha la prop userNumber, che prende il valore in ingresso
    screen = <GameScreen userNumber={userNumber}/>;
  }
  else if(gameIsOver && userNumber){
    screen = <GameOverScreen userNumber={userNumber} />;
  }

  function gameOverHandler(){
    setGameIsOver(true);
  }
  return (
    //N.B. senza la prop colors, LinearGradient non funziona
    <LinearGradient colors={["#3b013f", "#ddb52f"]} style={styles.rootScreen}>
      {/* //Questo  component viene dalla classe ImageBackGround (un'interfaccia che estende Image) */}
      <ImageBackground
        // Per caricare l'immagine dalla prop source uso sempre la funzione require() di Node
        source={require("./assets/images/background.png")}
        imageStyle={styles.backgroundImage}
        resizeMode={"cover"}
      >
        {/* Qui mi richiamo la variabile screen */}
        {/* Appllico il padding in automatico */}
        <SafeAreaView style={styles.rootScreen}> {screen} </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
