export const authenReducer = (currentState = false, action) => {
  // console.log("action", action);

  switch(action.type)
  {
    case "CHECK_AUTHEN":
      return action.status;

    default:
      return currentState;
  }
}