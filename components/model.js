// import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
// import { Image } from 'expo-image';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';

// export default function App() {
  
//   const [image, setImage] = useState(require('../assets/test.jpg'));
  
//   async function model() {
//     await tf.ready();
//     const tfliteModel = await tflite.loadTFLiteModel(
//       'https://tfhub.dev/tensorflow/lite-model/mobilenet_v2_1.0_224/1/metadata/1');
//     console.log('done')
//   }

//   // function processImage() {
//   //   setImage('../assets/test.jpg');
//   //   console.log(image);
//   // }


//   return (
//     <View style={styles.container}>
//       <View style={styles.upperContainer}>
//         {/* <Image style={styles.image}
          
//           source={{ uri: 'file:///C:\React\obectdetection\assets\test.jpg' }}
//         /> */}
//       </View>
//       <View style={styles.lowerContainer}>

//         <TouchableOpacity>
//           <Button title='Hello' onPress={model}>

//           </Button>
//         </TouchableOpacity>
//       </View>
      
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
    
//     flex: 1,
//     justifyContent: 'center',
//   },
//   lowerContainer: {
//     flex: 0.5,
//     backgroundColor: '#795695',
//   },
//   upperContainer: {
//     flex: 0.5,
//     backgroundColor: '#c8a4d4',
//   },
//   image: {
//     flex: 1,
//     width: '100%',
//   },
  
// });

// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Image } from 'react-native';
// import * as tf from '@tensorflow/tfjs';
// import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
// import * as mobilenet from '@tensorflow-models/mobilenet';

// const App = () => {
//   const [isTfReady, setIsTfReady] = useState(false);
//   const [result, setResult] = useState('');
//   const image = useRef(null);

//   const load = async () => {
//     try {
//       // Load mobilenet.
//       await tf.ready();
//       const model = await mobilenet.load();
//       setIsTfReady(true);

//       // Start inference and show result.
//       const image = require('./basketball.jpg');
//       const imageAssetPath = Image.resolveAssetSource(image);
//       const response = await fetch(imageAssetPath.uri, {}, { isBinary: true });
//       const imageDataArrayBuffer = await response.arrayBuffer();
//       const imageData = new Uint8Array(imageDataArrayBuffer);
//       const imageTensor = decodeJpeg(imageData);
//       const prediction = await model.classify(imageTensor);
//       if (prediction && prediction.length > 0) {
//         setResult(
//           `${prediction[0].className} (${prediction[0].probability.toFixed(3)})`
//         );
//         console.log(prediction);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <View
//       style={{
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <Image
//         ref={image}
//         source={require('./basketball.jpg')}
//         style={{ width: 200, height: 200 }}
//       />
//       {!isTfReady && <Text>Loading TFJS model...</Text>}
//       {isTfReady && result === '' && <Text>Classifying...</Text>}
//       {result !== '' && <Text>{result}</Text>}
//     </View>
//   );
// };

// export default App;