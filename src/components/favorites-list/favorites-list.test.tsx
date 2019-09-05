import * as renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from '../../reducer/reducer';

import card from '../../mocks/card'
import {FavoritesList} from "./favorites-list";

const store = createStore(reducer);

it(`Favorites list correctly renders`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <BrowserRouter>
        <FavoritesList
          favorites={[
            {
              city: 'Amsterdam',
              offers: [card]
            }
          ]}
        />
      </BrowserRouter>
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
