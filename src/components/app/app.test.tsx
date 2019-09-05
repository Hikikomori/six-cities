import * as renderer from 'react-test-renderer';
import axiosMock from 'axios'
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";

import reducer from '../../reducer/reducer';

import card from '../../mocks/card'
import {App} from './app';

const store = createStore(reducer, applyMiddleware(thunk.withExtraArgument(axiosMock)));

const fixForLeafletTest = () => {
  const div = document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  document.body.appendChild(div);
};

fixForLeafletTest();

it(`App correctly renders`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <App
        allOffers={[card]}
        isApplicationReady={true}
        favorites={[]}
        isUserLoggedIn={true}
        init={jest.fn()}
      />
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it(`App correctly renders without offers available`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <App
        allOffers={[]}
        isApplicationReady={true}
        favorites={[]}
        isUserLoggedIn={true}
        init={jest.fn()}
      />
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
