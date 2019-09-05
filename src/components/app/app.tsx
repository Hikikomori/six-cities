import {connect} from "react-redux";
import {Router, Switch, Route, Redirect} from "react-router-dom";

import {Operation as baseOperation} from "../../reducer/base/base";
import {sortFavorites} from "../../reducer/favorites/selectors";

import {Card} from '../../types'
import history from "../../history";

import withRequiredAuthorization from '../../hocs/with-required-authorization/with-required-authorization';
import Header from '../header/header';
import SvgSprite from '../svg-sprite/svg-sprite';
import MainPage from '../main-page/main-page';
import MainPageEmpty from '../main-page-empty/main-page-empty';
import SignIn from '../sign-in/sign-in';
import Favorites from '../favorites/favorites';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import Property from '../property/property';

const {init} = baseOperation;

interface Props {
  allOffers: Array<Card>,
  isApplicationReady: boolean,
  favorites: [],
  isUserLoggedIn: boolean,
  init: () => void,
}

class App extends React.PureComponent<Props, null> {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      allOffers,
      isApplicationReady,
      favorites,
      isUserLoggedIn} = this.props;

    if (isApplicationReady) {
      const Base = () => {
        return <React.Fragment>
          <SvgSprite/>
          <Header/>
        </React.Fragment>
      };

      return <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => {
            return <div className="page page--gray page--main">
              <Base/>
              {allOffers.length ?
                <MainPage/> :
                <MainPageEmpty/>
              }
            </div>;
          }} />
          <Route path="/login" exact render={() => {
            return <div className="page page--gray page--login">
              <Base/>
              <SignIn/>
            </div>;
          }} />
          <Route path="/favorites" render={() => {
            const FavoritesEmptyWrapped = withRequiredAuthorization(FavoritesEmpty, isUserLoggedIn);
            const FavoritesWrapped = withRequiredAuthorization(Favorites, isUserLoggedIn);

            if (favorites && favorites.length < 1){
              return <div className="page page--favorites-empty">
                <Base/>
                <FavoritesEmptyWrapped/>
              </div>;
            }

            return <div className="page">
              <Base/>
              <FavoritesWrapped/>
            </div>;
          }} />
          <Route path="/offer" exact render={() => {
            return <Redirect to="/"/>;
          }}/>
          <Route path="/offer/:id" render={({match}) => {
            if (parseInt(match.params.id, 10) === 0){
              return <Redirect to="/"/>;
            }

            return <div className="page">
              <Base/>
              <Property
                id = {parseInt(match.params.id, 10)}
              />
            </div>;
          }}/>
        </Switch>
      </Router>;
    }

    return null;
  }

  componentDidMount() {
    const {isApplicationReady, init} = this.props;

    if (!isApplicationReady) {
      init();
    }
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  allOffers: state.BASE.allOffers,
  isApplicationReady: state.BASE.isApplicationReady,
  favorites: sortFavorites(state),
  isUserLoggedIn: state.USER.isUserLoggedIn,
});

const mapDispatchToProps = {
  init,
};


export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
