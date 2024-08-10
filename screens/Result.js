import { useState } from 'react';
import { Image, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Result({ route }) {
  const { image, model } = route.params;

  const [prediction, setPrediction] = useState(null);

  (async () => {
    try {

      const response = await fetch(image);
      const imageDataArrayBuffer = await response.arrayBuffer();
      const imageData = new Uint8Array(imageDataArrayBuffer);
      const imageTensor = decodeJpeg(imageData);
      const pred = await model.classify(imageTensor);
      if (pred && pred.length > 0) {
        setPrediction(
          `${pred[0].className} (${pred[0].probability.toFixed(2)})`
        );
      }
    } catch (err) {
      console.log(err);
    }
  })();

  return (
    <View style={styles.container}>
      {
        prediction &&
        <>
          <View style={styles.imageWrap}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <Text>{prediction}</Text>
        </>
      }

      {
        !prediction && 
        <ActivityIndicator size={100} color={'black'} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  imageWrap: {
    flex: 0.5,
    width: '60%',
  }
});