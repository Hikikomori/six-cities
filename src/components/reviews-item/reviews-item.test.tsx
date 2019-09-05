import * as renderer from 'react-test-renderer';
import ReviewsItem from './reviews-item';
import review from '../../mocks/review'

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<ReviewsItem
      review={review}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
