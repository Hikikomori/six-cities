import * as renderer from 'react-test-renderer';
import MainPageEmpty from './main-page-empty';

it(`Empty main page correctly renders`, () => {
  const tree = renderer
    .create(<MainPageEmpty/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
