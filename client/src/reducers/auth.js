// Get user information from local storage
let userState;
if (localStorage.getItem("auth")) {
  userState = JSON.parse(localStorage.getItem("auth"));
} else {
  userState = null;
}

// user reducer function
export const authReducer = (state = userState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return {
        ...state,
        ...action.payload,
      };
    case "LOGOUT":
      return action.payload;
    default:
      return state;
  }
};
