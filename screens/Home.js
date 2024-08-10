import { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs-react-native';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Home = ({ navigation }) => {

  const [model, setModel] = useState(null);
  const [success, setSuccess] = useState(true);

  const loadModel = async () => {
    try {
      await tf.ready();
      const tfModel = await mobilenet.load({ version: 1, alpha: 0.25 });
      setModel(tfModel);
    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate("Result", { image: result.assets[0].uri, model });
    }


  };

  useEffect(() => {
    loadModel();
  }, []);

  return (

    <View style={styles.container}>
      {!model && success && <>
        <View style={styles.flexUtility}>
          <Image
            style={styles.icon}
            source={require('../assets/icon.png')}
          />
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>Eos</Text>
        </View>

        <ActivityIndicator style={styles.spinner} size={40} color={'black'} />
      </>}

      {model && success &&
        <>
          <View style={styles.marginUtility}>
            <Image
              style={styles.img}
              source={require('../assets/success.png')}
            />
            <Text style={styles.text}>Model Ready</Text>
          </View>
          <View style={styles.marginUtility}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
          </View>
        </>}

      {!success &&
        <>
          <Image
            style={styles.img}
            source={require('../assets/fail.png')}
          />
          <Text style={styles.text}>Could Not Load The Model</Text>
        </>}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },
  title: {
    fontWeight: '200',
    fontSize: 80,
    marginHorizontal: '2%'
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginHorizontal: '2%'
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginVertical: '5%',
  },
  text: {
    fontWeight: 'bold',
  },
  flexUtility: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '20%',
  },
  spinner: {
    marginVertical: '7.5%',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: '2%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  marginUtility: {
    marginVertical: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Home;