const initialState = {
  userData: {},
  isUserLoggedIn: false,
};

const ActionCreator = {
  saveUserData: (userData) => {
    return {
      type: `SAVE_USER_DATA`,
      payload: userData,
    };
  },

  setUserLoggedInFlag: (flag) => {
    return {
      type: `SET_USER_LOGGED_IN_FLAG`,
      payload: flag
    };
  },
};

const Operation = {
  sendLoginRequest: (email, password) => (_dispatch, _getState, api) => {
    return api.post(`/login`, {email, password})
      .then((response) => {
        return response.data;
      });
  },

  login: (email, password) => (dispatch) => {
    dispatch(Operation.sendLoginRequest(email, password))
      .then(
        (userData) => {
          dispatch(ActionCreator.saveUserData(userData));
          dispatch(ActionCreator.setUserLoggedInFlag(true));
        }
      );
  },

  getLoginStatus: () => (_dispatch, _getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        if(response){
          return response.data;
        }
      });
  },

  checkLogin: () => (dispatch) => {
    dispatch(Operation.getLoginStatus())
      .then(
        (userData) => {
          if (userData){
            dispatch(ActionCreator.saveUserData(userData));
            dispatch(ActionCreator.setUserLoggedInFlag(true));
          }
        }
      );
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SAVE_USER_DATA`: return Object.assign({}, state, {
      userData: action.payload
    });

    case `SET_USER_LOGGED_IN_FLAG`: return Object.assign({}, state, {
      isUserLoggedIn: action.payload,
    });

    default:
      return state;
  }
};

export {
  ActionCreator,
  Operation,
  reducer
}
