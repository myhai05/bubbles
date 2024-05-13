import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import generateUniqueId from '../components/id';

const { width, height } = Dimensions.get('window');
const bubbleSize = 50;

const BubbleGame = ({ speed }) => {
  const [bubbles, setBubbles] = useState([]);
  const [crushedBubbles, setCrushedBubbles] = useState(0);
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer === 0 && crushedBubbles >= 15) {
      setGameWon(true);
    } else if (timer === 0 && crushedBubbles < 15) {
      setGameOver(true);
    }
  }, [timer, crushedBubbles]);


  const handleBubblePress = id => {
    setBubbles(prevBubbles => {
      return prevBubbles.map(bubble => {
        if (bubble.id === id) {
          if (bubble.color === 'red') {
            setGameOver(true); // Si la bulle écrasée est rouge, déclenche la fin du jeu
          } else {
            setCrushedBubbles(prevCrushedBubbles => prevCrushedBubbles + 1);
          }
          return null;
        }
        return bubble;
      });
    });
  };

  useEffect(() => {
    if (!gameOver && !gameWon) {
      const colors = ['red', 'orange', 'green']; // Tableau de couleurs
      const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * colors.length); // Index aléatoire dans le tableau
        const color = colors[randomIndex]; // Sélection de la couleur en fonction de l'index
        let size;
        if (color === 'red') {
          size = 60; // Taille fixe pour la couleur rouge
        } else {
          size = Math.floor(Math.random() * 41) + 40; // Taille aléatoire entre 40 et 80 pour les autres couleurs
        }
        const newBubble = {
          id: generateUniqueId(),
          x: Math.random() * (width - bubbleSize),
          y: -bubbleSize,
          speed: speed,
          color,
          size,
          active: true,
        };
        setBubbles(prevBubbles => [...prevBubbles, newBubble]);
      }, 1000);
  
      return () => clearInterval(intervalId);
    }
  }, [gameOver, speed, gameWon]);

  const moveBubbles = () => {
    setBubbles(prevBubbles => {
      return prevBubbles.map(bubble => {
        if (!bubble || bubble.y >= height) {
          return null;
        }
        return {
          ...bubble,
          y: bubble.y + bubble.speed,
        };
      }).filter(Boolean);
    });
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(moveBubbles);
    return () => cancelAnimationFrame(animationId);
  }, [bubbles]);

  return (
    <View style={styles.container}> 
      {gameOver ? (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Perdu!!!</Text>
        </View>
      ) : gameWon ? (
        <View style={styles.gameWonContainer}>
          <Text style={styles.gameWonText}>Wow! Quelle course!!!</Text>
          <Text style={styles.gameWonText}>Score :{crushedBubbles}</Text>
        </View>
      ) : (
        <>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>Temps restant : {timer}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>Bulles écrasées : {crushedBubbles}</Text>
          </View>
          {bubbles.map(bubble => bubble && (
            <TouchableOpacity
              key={bubble.id}
              onPress={() => handleBubblePress(bubble.id)}
              style={[
                styles.bubble,
                { 
                  left: bubble.x, 
                  top: bubble.y, 
                  backgroundColor: bubble.color,
                  width: bubble.size,
                  height: bubble.size,
                },
              ]}
            />
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    flex: 1,
    backgroundColor: '#D4D6CC',
  },
  bubble: {
    position: 'absolute',
    borderRadius: bubbleSize / 2,
  },
  scoreContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  scoreText: {
    color: '#fff',
    fontSize: 16,
  },
  timerContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  gameWonContainer: {
    position: 'absolute',
    top: 100,
    left: 50,
    padding: 10,
    borderRadius: 10,
    fontWeight: "bold",
  },
  gameOverContainer: {
    position: 'absolute',
    top: 100,
    left: 150,
    padding: 10,
    borderRadius: 10,
  },
  timerText: {
    color: '#fff',
    fontSize: 16,
  },
  gameOverText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '50%',
    fontWeight: "bold",
  },
  gameWonText: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '50%',
    fontWeight: "bold",
  },
});

export default BubbleGame;

