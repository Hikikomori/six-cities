import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";
import {Operation, reducer} from "./base";
import card from "../../mocks/card";
import serverCard from "../../mocks/server-card";

const state = {
  allOffers: [card],
  activeOffer: null,
  city: 'Paris',
  cities: ['Paris'],
  sorting: `Popular`,
  sortingOptions: [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`],
  isApplicationReady: false,
  isSortingOpened: false
};

describe(`Base reducer works correctly: `, () => {
  it(`Should make a correct API call to /hotels`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadOffers = Operation.loadOffers();

    apiMock
      .onGet(`/hotels`)
      .reply(200, [{fake: true}]);

    return loadOffers(dispatch, jest.fn(), api)
      .then((data) => {
        expect(data).toEqual([{fake: true}]);
      });
  });

  it('Should handle SAVE_OFFERS', () => {
    const action = {
      type: `SAVE_OFFERS`,
      payload: [serverCard, serverCard]
    };
    expect(reducer(state, action).allOffers).toEqual([serverCard, serverCard]);
  });

  it('Should handle SAVE_OFFER', () => {
    const action = {
      type: `SAVE_OFFER`,
      payload: serverCard
    };
    expect(reducer(state, action).allOffers).toEqual([serverCard]);
  });

  it('Should handle GET_CITIES', () => {
    const action = {
      type: `GET_CITIES`
    };
    expect(reducer(state, action).cities).toEqual([serverCard.city.name]);
  });

  it('Should handle CHANGE_CITY', () => {
    const action = {
      type: `CHANGE_CITY`,
      payload: serverCard.city.name
    };
    expect(reducer(state, action).city).toEqual(serverCard.city.name);
  });

  it('Should handle SET_APP_READY_FLAG', () => {
    const action = {
      type: `SET_APP_READY_FLAG`,
      payload: true
    };
    expect(reducer(state, action).isApplicationReady).toEqual(true);
  });

  it('Should handle SET_ACTIVE_OFFER', () => {
    const action = {
      type: `SET_ACTIVE_OFFER`,
      payload: card
    };
    expect(reducer(state, action).activeOffer).toEqual(card);
  });

  it('Should handle CHANGE_SORTING', () => {
    const action = {
      type: `CHANGE_SORTING`,
      payload: state.sortingOptions[1]
    };
    expect(reducer(state, action).sorting).toEqual(state.sortingOptions[1]);
  });

  it('Should handle TOGGLE_SORTING_FLAG', () => {
    const action = {
      type: `TOGGLE_SORTING_FLAG`
    };
    expect(reducer(state, action).isSortingOpened).toEqual(!state.isSortingOpened);
  });
});
