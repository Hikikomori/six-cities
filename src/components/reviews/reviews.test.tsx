import * as renderer from 'react-test-renderer';
import {Reviews} from './reviews';
import review from '../../mocks/review'

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<Reviews
      id={1}
      reviews={[review]}
      getReviews={jest.fn()}
      setReviewsLoadedFlag={jest.fn()}
      isReviewsLoaded = {true}
      addComment={jest.fn()}
      isReviewFormSendError={false}
      isReviewFormSendSuccess={false}
      setReviewFormSuccessFlag={jest.fn()}
      setReviewFormErrorFlag={jest.fn()}
      isUserLoggedIn={true}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
