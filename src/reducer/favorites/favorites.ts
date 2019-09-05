import {OfferAdapter} from '../../adapter';
import {ActionCreator as base} from '../base/base';

const initialState = {
  favorites: [],
  isFavoritesLoaded: false,
};

const ActionCreator = {
  saveFavorites: (favorites) => {
    return {
      type: `SAVE_FAVORITES`,
      payload: favorites,
    };
  },

  convertFavorites: () => {
    return {
      type: `CONVERT_FAVORITES`
    };
  },

  setFavoritesFlag: (flag) => {
    return {
      type: `SET_FAVORITES_FLAG`,
      payload: flag
    };
  },
};

const Operation = {
  loadFavorites: () => (_dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        return response.data;
      });
  },

  sendOfferFavoriteState: (data) => (_dispatch, _getState, api) => {
    const {
      id,
      state
    } = data;

    return api.post(`/favorite/${id}/${state}`)
      .then((response) => {
        return response.data;
      });
  },

  changeOfferFavoriteState: (data) => (dispatch) => {
    dispatch(Operation.sendOfferFavoriteState(data))
      .then(
        (offer) => {
          dispatch(base.saveOffer(offer));
          dispatch(base.convertOffer(offer.id));
          dispatch(Operation.getFavorites());
        }
      );
  },

  getFavorites: () => (dispatch) => {
    dispatch(Operation.loadFavorites())
      .then((favorites) => {
        dispatch(ActionCreator.saveFavorites(favorites));
        dispatch(ActionCreator.convertFavorites());
        dispatch(ActionCreator.setFavoritesFlag(true));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SAVE_FAVORITES`: return Object.assign({}, state, {
      favorites: action.payload
    });

    case `CONVERT_FAVORITES`: return Object.assign({}, state, {
      favorites: OfferAdapter.parseOffers(state.favorites)
    });

    case `SET_FAVORITES_FLAG`: return Object.assign({}, state, {
      isFavoritesLoaded: action.payload,
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
