import React, {useRef, useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity, SafeAreaView} from 'react-native';
import {
  Text,
  Button,
  ButtonGroup,
  Icon,
  Spinner,
  Card,
} from '@ui-kitten/components';
import {
  Canvas,
  Path,
  SkPath,
  Skia,
  TouchInfo,
  useTouchHandler,
} from '@shopify/react-native-skia';
import ViewShot from 'react-native-view-shot';
import commonStyles from '../../styles/commonStyles';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Toast from 'react-native-root-toast';
import {mathpixText} from '../../api';
import MathView from 'react-native-math-view';
import { useRoute } from '@react-navigation/native';

const NoteScreen = ({navigation}) => {
  const captureRef = useRef(null);
  const canvasRef = useRef(null);
  const [paths, setPaths] = useState<SkPath[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [identifyContent, setIdentifyContent] = useState('');
  const [imgurl, setImgUrl] = useState('');

  //Drawing Start
  const onDrawingStart = useCallback((touchInfo: TouchInfo) => {
    setPaths(old => {
      const {x, y} = touchInfo;
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      return [...old, newPath];
    });
  }, []);

  //Drawing Active
  const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
    setPaths(currentPaths => {
      const {x, y} = touchInfo;
      const currentPath = currentPaths[currentPaths.length - 1];
      const lastPoint = currentPath.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      currentPath.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      return [...currentPaths.slice(0, currentPaths.length - 1), currentPath];
    });
  }, []);

  //touch
  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
    },
    [onDrawingActive, onDrawingStart],
  );

  //save
  const saveFunc = async () => {
    try {
      const uri = await captureRef.current.capture();
      //console.log('Snapshot captured:', uri);
      await CameraRoll.save(`file://${uri}`, {
        type: 'photo',
      });
     
      const apiKey = '37792d52396383d2d8fa85a20cad210c'; 
      const apiUrl = 'https://api.imgbb.com/1/upload';

      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        type: 'image/jpeg', 
        name: 'photo.jpg', 
      });

      const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      const result = await response.json();
      setImgUrl(result.data.url);
       // Return the uploaded image URL
    } else {
      throw new Error('Image upload failed');
    }

      //tip
      Toast.show('Image saved successfully', {
        duration: 2000,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    } catch (error) {
      console.error('Error capturing snapshot:', error);
    }
  };
2
  //clear
  const clearFunc = () => {
    setPaths([]);
  };

  //submit
  const submitFunc = async () => {
    setIdentifyContent('');
    setSubmitLoading(true);
    let params = {
      src: imgurl,
      options: {
        ocr: ['math', 'text'],
      },
    };

    mathpixText(params).then(res => {
      if (res.text) {
        setIdentifyContent(res.text);
        console.log(res.text);
        navigation.navigate('NewNote', {resText:res.text }); 
      }
      setSubmitLoading(false);
    });
  };
  return (
    <SafeAreaView>
      <ViewShot ref={captureRef} options={{format: 'png', quality: 0.9}}>
        <Canvas
          ref={canvasRef}
          style={styles.canvasContainer}
          onTouch={touchHandler}>
          {paths.map((path, index) => (
            <Path
              key={index}
              path={path}
              color={'#fff'}
              style={'stroke'}
              strokeWidth={2}
            />
          ))}
        </Canvas>
      </ViewShot>
      <View style={[commonStyles.flexRow, styles.buttonContainer]}>
        <Button onPress={clearFunc} style={[commonStyles.mr10]}>
          Clear
        </Button>
        <Button onPress={saveFunc} style={[commonStyles.mr10]}>
          Save
        </Button>
        <Button disabled={submitLoading ? true : false} onPress={submitFunc}>
          Submit
        </Button>
      </View>
      <View style={styles.identifyContent}>
        <Card header={<Text category="h6">Recognition results</Text>}>
          {submitLoading ? <Spinner /> : 
            <MathView math={identifyContent} style={styles.mathView} />
          }
          
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default NoteScreen;

//style
const styles = StyleSheet.create({
  canvasContainer: {
    width: '100%',
    height: 350,
    backgroundColor: '#000',
  },
  buttonContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  identifyContent: {
    padding: 10,
  },
});
