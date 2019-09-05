import {shallow} from 'enzyme';
import card from '../../mocks/card'
import {Property} from './property';
import review from "../../mocks/review";

it(`Property favorite button works`, () => {
  const clickHandler = jest.fn();
  const property = shallow(<Property
    id={1}
    offers={[card, card]}
    setActiveOffer={jest.fn()}
    changeOfferFavoriteState={clickHandler}
  />);
  const favoriteButton = property.find(`.property__bookmark-button`);
  favoriteButton.simulate(`click`);
  expect(clickHandler.mock.calls[0][0]).toStrictEqual({id: card.id, state: card.isFavorite ? 0 : 1});
});
