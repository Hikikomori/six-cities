import {OfferAdapter} from '../../adapter';
import {Operation as user} from '../user/user'

import card from '../../mocks/card'

const initialState = {
  allOffers: [card],
  activeOffer: null,
  city: 'Paris',
  cities: ['Paris'],
  sorting: `Popular`,
  sortingOptions: [`Popular`, `Price: low to high`, `Price: high to low`, `Top rated first`],
  isApplicationReady: false,
  isSortingOpened: false
};

const ActionCreator = {
  saveOffers: (offers) => {
    return {
      type: `SAVE_OFFERS`,
      payload: offers,
    };
  },

  saveOffer: (offer) => {
    return {
      type: `SAVE_OFFER`,
      payload: offer,
    };
  },

  convertOffers: () => {
    return {
      type: `CONVERT_OFFERS`
    };
  },

  convertOffer: (id) => {
    return {
      type: `CONVERT_OFFER`,
      payload: id
    };
  },

  getCities: () => {
    return {
      type: `GET_CITIES`,
    };
  },

  changeCity: (city) => {
    return {
      type: `CHANGE_CITY`,
      payload: city,
    };
  },

  setAppReadyFlag: (flag) => {
    return {
      type: `SET_APP_READY_FLAG`,
      payload: flag
    };
  },

  setActiveOffer: (offer) => {
    return {
      type: `SET_ACTIVE_OFFER`,
      payload: offer,
    };
  },

  changeSorting: (sorting) => {
    return {
      type: `CHANGE_SORTING`,
      payload: sorting,
    };
  },

  toggleSortingFlag: () => {
    return {
      type: `TOGGLE_SORTING_FLAG`
    };
  },
};

const Operation = {
  loadOffers: () => (_dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        return response.data;
      });
  },

  init: () => (dispatch, getState) => {
    dispatch(user.checkLogin());
    dispatch(Operation.loadOffers())
      .then(
        (offers) => {
          dispatch(ActionCreator.saveOffers(offers));

          if (getState().BASE.allOffers.length === 0) {
            dispatch(ActionCreator.setAppReadyFlag(true));
          } else {
            dispatch(ActionCreator.convertOffers());
            dispatch(ActionCreator.getCities());
            dispatch(ActionCreator.changeCity(getState().BASE.cities[0]));
            dispatch(ActionCreator.setAppReadyFlag(true));
          }
        }
      );
  },

  setCity: (city) => (dispatch) => {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.setActiveOffer(null));
  },

  setSorting: (sorting) => (dispatch) => {
    dispatch(ActionCreator.changeSorting(sorting));
    dispatch(ActionCreator.toggleSortingFlag());
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SAVE_OFFERS`: return Object.assign({}, state, {
      allOffers: action.payload
    });

    case `SAVE_OFFER`: return Object.assign({}, state, {
      allOffers: state.allOffers.map((offer) => {
        if (offer.id === action.payload.id) {
          offer = action.payload;
        }
        return offer;
      })
    });

    case `CONVERT_OFFERS`: return Object.assign({}, state, {
      allOffers: OfferAdapter.parseOffers(state.allOffers)
    });

    case `CONVERT_OFFER`: return Object.assign({}, state, {
      allOffers: state.allOffers.map((offer) => {
        if (offer.id === action.payload) {
          offer = OfferAdapter.parseOffer(offer);
        }
        return offer;
      })
    });

    case `GET_CITIES`: return Object.assign({}, state, {
      cities: Array.from(new Set(state.allOffers.map((card) => {
        return card.city.name;
      }))),
    });

    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload,
    });

    case `SET_APP_READY_FLAG`: return Object.assign({}, state, {
      isApplicationReady: action.payload,
    });

    case `SET_ACTIVE_OFFER`: return Object.assign({}, state, {
      activeOffer: action.payload,
    });

    case `CHANGE_SORTING`: return Object.assign({}, state, {
      sorting: action.payload,
    });

    case `TOGGLE_SORTING_FLAG`: return Object.assign({}, state, {
      isSortingOpened: !state.isSortingOpened,
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
