import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Pressable, Text } from 'react-native';

const initialWordPairs = [
  { id: '1', englishWord: 'Hello', russianWord: 'Привет' },
  { id: '2', englishWord: 'Dog', russianWord: 'Собака' },
  { id: '3', englishWord: 'Apple', russianWord: 'Яблоко' },
  { id: '2', englishWord: 'First', russianWord: 'Первый' },
];

const App = () => {
  const [wordPairs, setWordPairs] = useState(initialWordPairs);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);

  const handlePress = (word:string) => {
    if (selectedWords.length === 1) {
      const matchingWord = wordPairs.find(
        (pair) =>
          (pair.englishWord === word && pair.russianWord === selectedWords[0]) ||
          (pair.russianWord === word && pair.englishWord === selectedWords[0])
      );

      if (matchingWord) {
        const updatedWordPairs = wordPairs.filter(
          (pair) => pair.id !== matchingWord.id
        );
        setWordPairs(updatedWordPairs);
      }
      setSelectedWords([]);
    } else {
      setSelectedWords([word]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.wordContainer}>
        {wordPairs.map((item) => (
          <View key={item.id} style={styles.wordPair}>
            <View style={styles.wordButton}>
              <Text onPress={() => handlePress(item.englishWord)}>{item.englishWord}</Text>
            </View>
            <View style={styles.wordButton}>
              <Text onPress={() => handlePress(item.russianWord)}>{item.russianWord}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, 
  },
  wordContainer: {
    paddingHorizontal: 20,
  },
  wordPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
  },
  wordButton: {
    padding: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default App;
