import {shallow} from 'enzyme';
import {SignIn} from './sign-in';

it(`When user logins form is not sent`, () => {
  const onLogin = jest.fn();
  const signInPage = shallow(<SignIn
    login={onLogin}
    isUserLoggedIn={false}
  />);

  const form = signInPage.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onLogin).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});
