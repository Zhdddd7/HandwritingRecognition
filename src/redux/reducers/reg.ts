// reducers/registerReducer.js
const initialState = {
    isRegistering: false,
  };
  
  const registerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_REGISTER':
        return {
          ...state,
          isRegistering: !state.isRegistering,
        };
      case 'REGISTRATION_SUCCESS':
        return {
        ...state,
        isRegistering: false,
      };
      default:
        return state;
    }
  };
  
  export default registerReducer;
  