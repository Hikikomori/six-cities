import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";
import {Operation, reducer} from "./user";
import user from "../../mocks/user";

const state = {
  userData: {},
  isUserLoggedIn: false,
};

describe(`User reducer works correctly: `, () => {
  it(`Should make a correct API call to /login`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loginRequest = Operation.sendLoginRequest('test@test.com', 'password');

    apiMock
      .onPost(`/login`)
      .reply(200, [{fake: true}]);

    return loginRequest(dispatch, jest.fn(), api)
      .then((data) => {
        expect(data).toEqual([{fake: true}]);
      });
  });

  it('Should handle SAVE_USER_DATA', () => {
    const action = {
      type: `SAVE_USER_DATA`,
      payload: user
    };
    expect(reducer(state, action).userData).toEqual(user);
  });

  it('Should handle SET_USER_LOGGED_IN_FLAG', () => {
    const action = {
      type: `SET_USER_LOGGED_IN_FLAG`,
      payload: true
    };
    expect(reducer(state, action).isUserLoggedIn).toEqual(true);
  });
});
