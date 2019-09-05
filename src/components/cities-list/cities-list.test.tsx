import * as renderer from 'react-test-renderer';
import {CitiesList} from './cities-list';

it(`Cities List correctly renders`, () => {
  const tree = renderer
    .create(<CitiesList
      activeCity={``}
      cities={[`Amsterdam`]}
      setCity={jest.fn()}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
