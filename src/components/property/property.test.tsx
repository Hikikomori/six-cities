import * as renderer from 'react-test-renderer';
import axiosMock from 'axios'
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";

import reducer from '../../reducer/reducer';

import {Property} from './property';

import card from '../../mocks/card'

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(axiosMock)));

const fixForLeafletTest = () => {
  const div = document.createElement(`section`);
  div.setAttribute(`id`, `map`);
  document.body.appendChild(div);
};

fixForLeafletTest();

it(`Property page correctly renders`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <Property
        id={1}
        offers={[card, card]}
        setActiveOffer={jest.fn()}
        changeOfferFavoriteState={jest.fn()}
      />
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
