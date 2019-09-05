import {shallow} from 'enzyme';
import card from '../../mocks/card'
import {PlaceCard} from './place-card';

it(`Main place card image link works`, () => {
  const clickHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    card={card}
    isOnPropertyPage={false}
    isOnFavoritesPage={false}
    setActiveOffer={clickHandler}
    changeOfferFavoriteState={jest.fn()}
  />);
  const imageLink = placeCard.find(`.place-card__image-wrapper a`);
  imageLink.simulate(`click`, {preventDefault() {}});
  expect(clickHandler.mock.calls[0][0]).toBe(card);
});

it(`Main place card favorite button works`, () => {
  const clickHandler = jest.fn();
  const placeCard = shallow(<PlaceCard
    card={card}
    isOnPropertyPage={false}
    isOnFavoritesPage={false}
    setActiveOffer={jest.fn()}
    changeOfferFavoriteState={clickHandler}
  />);
  const favoriteButton = placeCard.find(`.place-card__bookmark-button`);
  favoriteButton.simulate(`click`);
  expect(clickHandler.mock.calls[0][0]).toStrictEqual({id: card.id, state: card.isFavorite ? 0 : 1});
});
