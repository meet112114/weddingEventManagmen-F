export const initialState = {
    user: null,       
    vendor: null,     
    admin: null,
    location: null
  };

  export const reducer = (state, action) => {
    switch (action.type) {
      case "USER_LOGIN":
        return { ...state, user: action.payload, vendor: null,  admin: null };  // User logged in, vendor is logged out
      case "USER_LOGOUT":
        return { ...state, user: null ,vendor: null,   admin: null};  // User logged out
      case "VENDOR_LOGIN":
        return { ...state, vendor: action.payload, user: null , admin: null};  // Vendor logged in, user is logged out
      case "ADMIN_LOGIN":
        return{ ...state, admin: action.payload , user: null , vendor: null}
      case "SET_LOCATION" :
        return{...state, location: action.payload }
      default:
        return state;
    }
  };
