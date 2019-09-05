import * as renderer from 'react-test-renderer';
import axiosMock from 'axios'
import {applyMiddleware, createStore} from 'redux';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";

import reducer from '../../reducer/reducer';

import {Favorites} from './favorites';
const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(axiosMock)));

it(`Favorites page correctly renders`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <BrowserRouter>
        <Favorites
          isFavoritesLoaded={true}
          getFavorites={jest.fn()}
        />
      </BrowserRouter>
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
