import * as renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import card from '../../mocks/card'
import {PlaceCard} from './place-card';

it(`Main place card correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <PlaceCard
        card={card}
        isOnPropertyPage={false}
        isOnFavoritesPage={false}
        setActiveOffer={jest.fn()}
        changeOfferFavoriteState={jest.fn()}
      />
    </BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it(`Property place card correctly renders`, () => {
  const tree = renderer
    .create(<PlaceCard
      card={card}
      isOnPropertyPage={true}
      isOnFavoritesPage={false}
      setActiveOffer={jest.fn()}
      changeOfferFavoriteState={jest.fn()}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Favorite place card correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <PlaceCard
        card={card}
        isOnPropertyPage={false}
        isOnFavoritesPage={true}
        setActiveOffer={jest.fn()}
        changeOfferFavoriteState={jest.fn()}
      />
    </BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
