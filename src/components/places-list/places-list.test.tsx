import * as renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from '../../reducer/reducer';
import card from '../../mocks/card'
import PlacesList from './places-list';

const store = createStore(reducer);

it(`Main places list correctly renders`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <BrowserRouter>
        <PlacesList
          cards={[card]}
          isOnPropertyPage={false}
          isOnFavoritesPage={false}
        />
      </BrowserRouter>
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Property nearby places list correctly renders`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <PlacesList
        cards={[card]}
        isOnPropertyPage={true}
        isOnFavoritesPage={false}
      />
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`Favorite places list correctly renders`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <BrowserRouter>
        <PlacesList
          cards={[card]}
          isOnPropertyPage={false}
          isOnFavoritesPage={true}
        />
      </BrowserRouter>
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
