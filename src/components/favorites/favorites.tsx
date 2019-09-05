import {connect} from "react-redux";

import {Operation as favoritesOperation} from "../../reducer/favorites/favorites";

import FavoritesList from '../favorites-list/favorites-list'

const {getFavorites} = favoritesOperation;

interface Props {
  isFavoritesLoaded: boolean,
  getFavorites: () => void
}

const Favorites:React.FC<Props> = (props) => {
  const {
    isFavoritesLoaded,
    getFavorites
  } = props;

  if (!isFavoritesLoaded) {
    getFavorites();
    return null;
  }

  return <main className="page__main page__main--favorites">
    <div className="page__favorites-container container">
      <section className="favorites">
        <h1 className="favorites__title">Saved listing</h1>
        <FavoritesList/>
      </section>
    </div>
  </main>
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  isFavoritesLoaded: state.FAVORITES.isFavoritesLoaded,
});

const mapDispatchToProps = {
  getFavorites
};

export {Favorites}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)
