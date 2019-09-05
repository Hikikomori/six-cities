import * as renderer from 'react-test-renderer';
import SvgSprite from './svg-sprite';

it(`Svg sprite correctly renders`, () => {
  const tree = renderer
    .create(<SvgSprite/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
