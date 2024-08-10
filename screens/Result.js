import { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function Result({ route, navigation }) {
  const { image, model } = route.params;
  const [prediction, setPrediction] = useState(null);

  const inference = async () => {
    try {
      const response = await fetch(image);
      const imageDataArrayBuffer = await response.arrayBuffer();
      const imageData = new Uint8Array(imageDataArrayBuffer);
      const imageTensor = decodeJpeg(imageData);
      const pred = await model.classify(imageTensor);
      if (pred && pred.length > 0) {
        setPrediction(
          `${pred[0].className}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    inference();
    return () => {setPrediction(null)};
  }, []);

  return (
    <View style={styles.container}>
      {
        prediction &&
        <>
          <Text style={styles.heading}>Classifcation</Text>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.text}>Class: {prediction}</Text>

          <View style={styles.marginUtility}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
  image: {

    height: '30%',
    width: '30%',
    aspectRatio: 1,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: 'grey',
  },
  heading: {
    fontSize: 45,
    fontWeight: '400',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  marginUtility: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});