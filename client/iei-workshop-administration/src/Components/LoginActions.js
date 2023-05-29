export const loginSuccess = () => {
    return {
      type: 'LOGIN_SUCCESS'
    };
  };
  
  // authReducer.js
  const initialState = {
    isAuthenticated: false
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true
        };
      default:
        return state;
    }
  };