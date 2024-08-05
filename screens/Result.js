import { useState } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

export default function Result({ route }) {
  const { image } = route.params;

  const [prediction, setPrediction] = useState(null);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      {prediction && <Text>{prediction}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});