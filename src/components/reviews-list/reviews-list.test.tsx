import * as renderer from 'react-test-renderer';
import ReviewsList from './reviews-list';
import review from '../../mocks/review'

it(`Review correctly renders`, () => {
  const tree = renderer
    .create(<ReviewsList
      reviews={[review]}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
