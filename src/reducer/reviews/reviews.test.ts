import MockAdapter from "axios-mock-adapter";
import createAPI from "../../api";
import {Operation, reducer} from "./reviews";
import serverReview from "../../mocks/server-review";
import review from "../../mocks/review";

const state = {
  reviews: [serverReview],
  isReviewsLoaded: false,
  isReviewFormSendError: false,
  isReviewFormSendSuccess: false
};

describe(`Reviews reducer works correctly: `, () => {
  it(`Should make a correct API call to /comments`, function () {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const loadReviews = Operation.loadReviews(1);

    apiMock
      .onGet( `/comments/1`)
      .reply(200, [{fake: true}]);

    return loadReviews(dispatch, jest.fn(), api)
      .then((data) => {
        expect(data).toEqual([{fake: true}]);
      });
  });

  it('Should handle SAVE_REVIEWS', () => {
    const action = {
      type: `SAVE_REVIEWS`,
      payload: [review]
    };
    expect(reducer(state, action).reviews).toEqual([review]);
  });

  it('Should handle CONVERT_REVIEWS', () => {
    const action = {
      type: `CONVERT_REVIEWS`,
    };
    expect(reducer(state, action).reviews).toEqual([review]);
  });

  it('Should handle SET_REVIEWS_LOADED_FLAG', () => {
    const action = {
      type: `SET_REVIEWS_LOADED_FLAG`,
      payload: true
    };
    expect(reducer(state, action).isReviewsLoaded).toEqual(true);
  });

  it('Should handle SET_REVIEW_FORM_ERROR_FLAG', () => {
    const action = {
      type: `SET_REVIEW_FORM_ERROR_FLAG`,
      payload: true
    };
    expect(reducer(state, action).isReviewFormSendError).toEqual(true);
  });

  it('Should handle SET_REVIEW_FORM_SUCCESS_FLAG', () => {
    const action = {
      type: `SET_REVIEW_FORM_SUCCESS_FLAG`,
      payload: true
    };
    expect(reducer(state, action).isReviewFormSendSuccess).toEqual(true);
  });
});
