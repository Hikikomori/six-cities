import * as renderer from 'react-test-renderer';
import {SignIn} from './sign-in';


it(`Sign in page correctly renders`, () => {
  const tree = renderer
    .create(<SignIn
      login={jest.fn()}
      isUserLoggedIn={false}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
