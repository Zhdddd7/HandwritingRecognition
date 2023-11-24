import {StyleSheet, View, TouchableWithoutFeedback,TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Input, Icon, Text} from '@ui-kitten/components';
import {login} from '../../../src/redux/actions/auth';
import { toggleRegister } from '../../redux/actions/reg';
import commonStyles from '../../styles/commonStyles';
import {awsapprunnerLogin} from '../../api';
import Toast from 'react-native-root-toast';



const LoginScreen = () => {
  const dispatch = useDispatch();
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);


  const showRegister = () => {
    dispatch(toggleRegister());
  };

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const loginFunc = async () => {
    if (!usernameValue) {
      return Toast.show('please enter username');
    }
    if (!passwordValue) {
      return Toast.show('please enter password');
    }
    setIsSubmit(true);
    let params = {
      username: usernameValue, //Testu
      password: passwordValue, //123456
    };

    awsapprunnerLogin(params).then(res => {
      if (res.message == 'Login successful') {
        dispatch(login());
      }
      Toast.show(res.message);
      setIsSubmit(false);
    });
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  
  return (
    <View style={[styles.loginContainer]}>
      <Input
        placeholder="username"
        value={usernameValue}
        onChangeText={nextValue => setUsernameValue(nextValue)}
        style={commonStyles.mb15}
      />
      <Input
        value={passwordValue}
        placeholder="password"
        accessoryRight={renderIcon}
        secureTextEntry={secureTextEntry}
        onChangeText={nextValue => setPasswordValue(nextValue)}
        style={commonStyles.mb15}
      />
     
     <TouchableOpacity onPress={showRegister}>
        <Text style={styles.registerText}>Register New</Text>
      </TouchableOpacity>
      <Button onPress={() => loginFunc()} disabled={isSubmit}>
        Login
      </Button>


    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginContainer: {
    
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 25,
  },
  registerText: {
   
    
    left: '35%', // Adjust the position as needed
    fontSize: 14,
    color: 'blue', // Customize the color as needed
  },
});
