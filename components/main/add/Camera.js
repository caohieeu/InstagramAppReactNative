import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useState } from 'react';

import { Camera, CameraType } from 'expo-camera';
import Feather from 'react-native-vector-icons/Feather'
import * as ImagePicker from 'expo-image-picker'

export default function Add({ navigation, props }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    if(camera) {
        const data = await camera.takePictureAsync(null);
        setImage(data.uri);
    }
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
    });

    if(!result.canceled) {
        setImage(result.assets[0].uri);
    }
    else {
        alert('You did not select any image');
    }
  }

  if(!image) {
    return (
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Camera 
              style={styles.camera}
              ref={ref => setCamera(ref)}
              type={type}
              ratio={'1:1'} />
        </View>
        {image && <Image source={{uri: image}} style={{flex: 1, marginTop: 255, width: 100}} />}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Feather 
                  name="rotate-cw"
                  size={30} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Feather 
                  name="aperture"
                  size={50} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
              <Feather 
                  name="image"
                  size={30} />
            </TouchableOpacity>
          </View>
      </View>
    );
  }
  else {
    console.log(image);
    return (
      <View style={styles.container}>
        <View style={[styles.cameraContainer]}>
          <Image 
            source={{ uri: image }}
            style={{flex: 1}} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Feather 
                    style={{margin: 10}}
                    name="trash-2"
                    size={50}
                    onPress={() => setImage(null)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather 
                    style={{margin: 10}}
                    name="check"
                    size={50}
                    color={'green'}
                    onPress={() => navigation.navigate("Save", {image})} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
