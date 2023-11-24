import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {NavigationContainer} from '@react-navigation/native';
// import MainScreen from './src/views/MainScreen';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LogBox} from 'react-native';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {useSelector} from 'react-redux';
import {selectIsAuthenticated} from './src/redux/selectors/auth';
import LoginScreen from './src/views/Login/LoginScreen';
import FooterScreen from './src/views/Footer/FooterScreen';
import RegisterScreen from './src/views/Login/RegisterScreen';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function MainScreen() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isRegistering = useSelector((state) => state.reg.isRegistering);

  return (
    <>
      {isAuthenticated ? (
        <FooterScreen></FooterScreen>
      ) : (isRegistering ? (
        <RegisterScreen />
      ) : (
        <LoginScreen></LoginScreen>
      )
       
      )}
    </>
  );
}

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <MainScreen />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
