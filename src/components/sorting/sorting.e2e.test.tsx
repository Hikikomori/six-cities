import {shallow} from 'enzyme';
import {Sorting} from './sorting';

it('Sorting buttons work', () => {
  const clickHandler = jest.fn();
  const sorting = shallow(<Sorting
    options={['Popular']}
    active={'Popular'}
    isSortingOpened={true}
    toggleSortingFlag={jest.fn()}
    setSorting={clickHandler}
  />);
  const sortingBtn = sorting.find(`.places__option`);
  sortingBtn.simulate(`click`);
  expect(clickHandler.mock.calls[0][0]).toBe('Popular');
});
