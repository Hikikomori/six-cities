import * as ReactRouterDOM from 'react-router-dom'
const Link = ReactRouterDOM.Link;

import {User} from '../../types'
import {connect} from "react-redux";

interface Props {
  isUserLoggedIn: boolean,
  user: User
}

const Header: React.FC<Props> = (props) => {
  const {
    isUserLoggedIn,
    user} = props;

  return <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to="/" className="header__logo-link header__logo-link--active">
            <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item user">
              {isUserLoggedIn ? (
                <Link to="/favorites" className="header__nav-link header__nav-link--profile">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                <img className="user__avatar" alt="avatar" src={`https://es31-server.appspot.com/six-cities${user.avatar_url}`} />
                </div>
                <span className="header__user-name user__name">{user.email}</span>
                </Link>
              ) : (
                <Link to="/login" className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__login">Sign in</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  user: state.USER.userData,
  isUserLoggedIn: state.USER.isUserLoggedIn,
});

export {Header}

export default connect(mapStateToProps, null)(Header);
