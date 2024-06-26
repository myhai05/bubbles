import React, { useState } from 'react';
import { StyleSheet, View, Button, Dimensions, Text } from 'react-native';
import BubbleGame from '../../components/bubbles';
const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const [gameSpeed, setGameSpeed] = useState(0); // Vitesse par défaut

  const goToHome = () => {
    setGameSpeed(0);
  };

  return (
    <View style={styles.container}>
      {gameSpeed ? (
        <BubbleGame speed={gameSpeed} /> // Passer la vitesse du jeu comme prop
      ) : (
        <><View style={styles.gameTitleContainer}>
          <Text style={styles.gameTitle}>Lance toi! </Text>
          <Text style={styles.gameTitle}>Attention au rouge!</Text>
        </View>
          <View style={styles.startButtonContainer}>
            <Button title="Expert" onPress={() => setGameSpeed(15)} />
          </View>
          <View style={styles.startButtonContainer}>
            <Button title="Intermediare" onPress={() => setGameSpeed(10)} />
          </View>
          <View style={styles.startButtonContainer}>
            <Button title="Débutant" onPress={() => setGameSpeed(5)} />
          </View>
        </>
      )}
      <View style={styles.homeButtonContainer}>
        <Button title="Home" onPress={goToHome} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Aligne le contenu en bas de l'écran
    alignItems: 'center',
    paddingBottom: 20, // Ajoute un espace en bas de l'écran pour le bouton "Home"
  },
  startButtonContainer: {
    marginBottom: 70,
    backgroundColor: "red",
    borderRadius: 50,
  },
  gameTitleContainer: {
    marginBottom: 50,
  },
  gameTitle: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
  },
  homeButtonContainer: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 0,
    width: width,
  },
});