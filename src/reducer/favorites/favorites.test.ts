import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";
import {Operation, reducer} from "./favorites";
import serverCard from "../../mocks/server-card";
import card from "../../mocks/card";

const state = {
  favorites: [serverCard],
  isFavoritesLoaded: false,
};

describe(`Favorites reducer works correctly: `, () => {
  it(`Should make a correct API call to /favorite`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadFavorites = Operation.loadFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [{fake: true}]);

    return loadFavorites(dispatch, jest.fn(), api)
      .then((data) => {
        expect(data).toEqual([{fake: true}]);
      });
  });

  it('Should handle SAVE_FAVORITES', () => {
    const action = {
      type: `SAVE_FAVORITES`,
      payload: [serverCard]
    };
    expect(reducer(state, action).favorites).toEqual([serverCard]);
  });

  it('Should handle CONVERT_FAVORITES', () => {
    const action = {
      type: `CONVERT_FAVORITES`
    };
    expect(reducer(state, action).favorites).toEqual([card]);
  });

  it('Should handle SET_FAVORITES_FLAG', () => {
    const action = {
      type: `SET_FAVORITES_FLAG`,
      payload: true
    };
    expect(reducer(state, action).isFavoritesLoaded).toEqual(true);
  });
});
