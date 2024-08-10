import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraComponent({route, navigation}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [camera, setCamera] = useState(null);

  if (!permission) {
  
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>

      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    let options = {skipProcessing: true, base64: false, quality: 0.01};
    let picutre = await camera.takePictureAsync(options=options);
    
    navigation.navigate("Result", { image: picutre.uri, model: route.params.model })
    
  }

  return (
    <View style={styles.cameraContainer}>
      <CameraView style={styles.camera} facing={facing} ref={(ref) => setCamera(ref)}>
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
          <Image
              style={styles.icon}
              source={require('../assets/flip.png')}
            />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.pictureButton} onPress={takePicture}>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
  },
  message: {
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  camera: {
    width: '100%',
    flex: 1,
    
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  pictureButton: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 40,
    borderWidth: 5,
    borderColor: 'gray',
    marginBottom: '6%',
    
  },

  flipButton: {
    alignSelf: 'flex-end',
    marginRight: '8%',
    marginTop: '15%',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

});



