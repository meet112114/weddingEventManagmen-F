export const initialState = {
    user: null,       
    vendor: null,     
  };

  export const reducer = (state, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return { ...state, user: action.payload, vendor: null };  // User logged in, vendor is logged out
      case "USER_LOGOUT":
        return { ...state, user: null ,vendor: null,  };  // User logged out
      case "VENDOR_LOGIN":
        return { ...state, vendor: action.payload, user: null };  // Vendor logged in, user is logged out
      default:
        return state;
    }
  };
