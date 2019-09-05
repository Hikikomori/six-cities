import * as renderer from 'react-test-renderer';
import {BrowserRouter} from "react-router-dom";
import {Header} from './header';
import user from '../../mocks/user'


it(`Header page correctly renders`, () => {
  const tree = renderer
    .create(<BrowserRouter>
      <Header
        isUserLoggedIn={true}
        user={user}
      />
    </BrowserRouter>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
