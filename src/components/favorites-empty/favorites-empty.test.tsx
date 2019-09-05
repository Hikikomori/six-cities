import * as renderer from 'react-test-renderer';
import FavoritesEmpty from "./favorites-empty";


it(`Empty favorites page correctly renders`, () => {
  const tree = renderer
    .create(<FavoritesEmpty/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
