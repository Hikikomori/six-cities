import * as renderer from 'react-test-renderer';
import Map from './map';
import card from '../../mocks/card'

const fixForLeafletTest = () => {
  const div = document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  document.body.appendChild(div);
};

fixForLeafletTest();

it(`Map container correctly renders`, () => {
  const tree = renderer
    .create(<Map
      offers={[card]}
      isOnPropertyPage={false}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
