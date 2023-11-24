import {StyleSheet} from 'react-native';
const commonStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#000',
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  verticalCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  appContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  mb15: {
    marginBottom: 15,
  },
  mt15: {
    marginTop: 15,
  },
  ml15: {
    marginLeft: 15,
  },
  mr15: {
    marginRight: 15,
  },
  mb10: {
    marginBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
  ml10: {
    marginLeft: 10,
  },
  mr10: {
    marginRight: 10,
  },
  pb15: {
    paddingBottom: 15,
  },
  pt15: {
    paddingTop: 15,
  },
  pl15: {
    paddingLeft: 15,
  },
  pr15: {
    paddingRight: 15,
  },
  pb10: {
    paddingBottom: 10,
  },
  pt10: {
    paddingTop: 10,
  },
  pl10: {
    paddingLeft: 10,
  },
  pr10: {
    paddingRight: 10,
  },
  right: {
    textAlign: 'right',
  },
  flexBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  menuItem: {
    backgroundColor: 'transparent',
  },
  appBg: {
    backgroundColor: '#000',
  },
  backBg: {
    backgroundColor: '#1b1b1b',
  },
  //content
  contentContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 110,
  },
  appMarginBottom: {
    marginBottom: 110,
  },
});

export default commonStyles;
