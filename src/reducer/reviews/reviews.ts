import {ReviewAdapter} from '../../adapter';

const initialState = {
  reviews: [],
  isReviewsLoaded: false,
  isReviewFormSendError: false,
  isReviewFormSendSuccess: false
};

const ActionCreator = {
  saveReviews: (reviews) => {
    return {
      type: `SAVE_REVIEWS`,
      payload: reviews,
    };
  },

  convertReviews: () => {
    return {
      type: `CONVERT_REVIEWS`
    };
  },

  setReviewsLoadedFlag: (flag) => {
    return {
      type: `SET_REVIEWS_LOADED_FLAG`,
      payload: flag
    };
  },

  setReviewFormErrorFlag: (flag) => {
    return {
      type: `SET_REVIEW_FORM_ERROR_FLAG`,
      payload: flag
    };
  },

  setReviewFormSuccessFlag: (flag) => {
    return {
      type: `SET_REVIEW_FORM_SUCCESS_FLAG`,
      payload: flag
    };
  },
};

const Operation = {
  loadReviews: (id) => (_dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        return response.data;
      });
  },

  getReviews: (id) => (dispatch) => {
    dispatch(Operation.loadReviews(id))
      .then((reviews) => {
        dispatch(ActionCreator.saveReviews(reviews));
        dispatch(ActionCreator.convertReviews());
        dispatch(ActionCreator.setReviewsLoadedFlag(true));
      });
  },

  sendComment: (data) => (_dispatch, _getState, api) => {
    const {
      id,
      rating,
      comment
    } = data;

    return api.post(`/comments/${id}`, {rating, comment})
      .then((response) => {
        return response.data;
      });
  },

  addComment: (data) => (dispatch) => {
    dispatch(Operation.sendComment(data))
      .then((reviews) => {
        dispatch(ActionCreator.saveReviews(reviews));
        dispatch(ActionCreator.convertReviews());
        dispatch(ActionCreator.setReviewFormSuccessFlag(true));
      })
      .catch(() => {
        dispatch(ActionCreator.setReviewFormErrorFlag(true));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `SAVE_REVIEWS`: return Object.assign({}, state, {
      reviews: action.payload
    });

    case `CONVERT_REVIEWS`: return Object.assign({}, state, {
      reviews: ReviewAdapter.parseReviews(state.reviews)
    });

    case `SET_REVIEWS_LOADED_FLAG`: return Object.assign({}, state, {
      isReviewsLoaded: action.payload,
    });

    case `SET_REVIEW_FORM_ERROR_FLAG`: return Object.assign({}, state, {
      isReviewFormSendError: action.payload,
    });

    case `SET_REVIEW_FORM_SUCCESS_FLAG`: return Object.assign({}, state, {
      isReviewFormSendSuccess: action.payload,
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
