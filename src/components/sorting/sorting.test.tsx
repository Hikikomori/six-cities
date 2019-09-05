import * as renderer from 'react-test-renderer';
import {Sorting} from './sorting';

it(`Sorting correctly renders`, () => {
  const tree = renderer
    .create(<Sorting
      options={['Popular']}
      active={'Popular'}
      isSortingOpened={true}
      toggleSortingFlag={jest.fn()}
      setSorting={jest.fn()}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
