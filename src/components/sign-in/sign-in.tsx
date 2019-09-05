import {connect} from "react-redux";

import * as ReactRouterDOM from 'react-router-dom'
const Redirect = ReactRouterDOM.Redirect;

import {Operation as userOperation} from "../../reducer/user/user";

const {login} = userOperation;

interface Props {
  login: (email: FormDataEntryValue, password: FormDataEntryValue) => void
  isUserLoggedIn: boolean
}

const SignIn: React.FC<Props> = (props) => {
  const {
    login,
    isUserLoggedIn} = props;

  if (isUserLoggedIn){
    return <Redirect to="/" />;
  }

  return <main className="page__main page__main--login">
    <div className="page__login-container container">
      <section className="login">
        <h1 className="login__title">Sign in</h1>
        <form className="login__form form" action="#" method="post" onSubmit={(evt) => {
          evt.preventDefault();
          const data = new FormData(evt.currentTarget);
          login(data.get(`email`), data.get(`password`));
        }}>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">E-mail</label>
            <input className="login__input form__input" type="email" name="email" placeholder="Email" required={true} />
          </div>
          <div className="login__input-wrapper form__input-wrapper">
            <label className="visually-hidden">Password</label>
            <input className="login__input form__input" type="password" name="password" placeholder="Password" required={true} />
          </div>
          <button className="login__submit form__submit button" type="submit">Sign in</button>
        </form>
      </section>
      <section className="locations locations--login locations--current">
        <div className="locations__item"/>
      </section>
    </div>
  </main>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isUserLoggedIn: state.USER.isUserLoggedIn,
});

const mapDispatchToProps = {
  login
};

export {SignIn};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
