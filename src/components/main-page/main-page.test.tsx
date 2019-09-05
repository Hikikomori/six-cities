import * as renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducer from '../../reducer/reducer';

import {MainPage} from './main-page';

import card from '../../mocks/card'

const store = createStore(reducer);

const fixForLeafletTest = () => {
  const div = document.createElement(`div`);
  div.setAttribute(`id`, `map`);
  document.body.appendChild(div);
};

fixForLeafletTest();

it(`Main page correctly renders`, () => {
  const tree = renderer
    .create(<Provider store={store}>
      <BrowserRouter>
        <MainPage
          city={`Amsterdam`}
          offers={[card]}
        />
      </BrowserRouter>
    </Provider>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
