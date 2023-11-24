import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {Button, Menu, MenuItem, Icon, Avatar} from '@ui-kitten/components';
import commonStyles from '../../styles/commonStyles';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/auth';
import Toast from 'react-native-root-toast';

const ProfileHomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  //Note
  const meetFunc = () => {
    navigation.navigate('AINote');
  };
  const meetFunc2 = () => {
    navigation.navigate('NewNote');
  };
  const meetFunc3 = () => {
    navigation.navigate('NoteHistory');
  };

  const logoutFunc = () => {
    Toast.show('logout successful');
    dispatch(logout());
  };
  return (
    <SafeAreaView>
      <View>
        <Menu
          style={[
            commonStyles.appContainer,
            commonStyles.mt15,
            commonStyles.mb15,
          ]}>
          <MenuItem
            title="Admin"
            style={[commonStyles.menuItem, {height: 60}]}
            accessoryRight={
              <View>
                <Avatar
                  source={{
                    uri: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    position: 'relative',
                    bottom: 15,
                    right: 20,
                  }}
                />
              </View>
            }
          />
        </Menu>
        <Menu style={[commonStyles.appContainer]}>
        
          <MenuItem
            title="Create New"
            style={commonStyles.menuItem}
            onPress={meetFunc2}
            accessoryRight={<Icon name="arrow-ios-forward" />}
          />
          <MenuItem
            title="AINote"
            style={commonStyles.menuItem}
            onPress={meetFunc}
            accessoryRight={<Icon name="arrow-ios-forward" />}
          />
          <MenuItem
            title="NoteHistory"
            style={commonStyles.menuItem}
            onPress={meetFunc3}
            accessoryRight={<Icon name="arrow-ios-forward" />}
          />
          <MenuItem
            title="Log Out"
            style={commonStyles.menuItem}
            onPress={() => logoutFunc()}
            accessoryRight={<Icon name="arrow-ios-forward" />}
          />
        </Menu>
      </View>
    </SafeAreaView>
  );
};

export default ProfileHomeScreen;

const styles = StyleSheet.create({});
