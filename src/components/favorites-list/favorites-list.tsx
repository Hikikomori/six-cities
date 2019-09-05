import {connect} from "react-redux";

import {sortFavorites} from "../../reducer/favorites/selectors";

import {Card} from '../../types'

import PlacesList from "../places-list/places-list";

interface Props {
  favorites: [{
    city: string,
    offers: Array<Card>
  }]
}

const FavoritesList: React.FC<Props> = (props) => {
  const {favorites} = props;

  return <ul className="favorites__list">
    {favorites.map((favorite, i) => {
      return <li className="favorites__locations-items" key={i}>
        <div className="favorites__locations locations locations--current">
          <div className="locations__item">
            <a className="locations__item-link" href="#">
              <span>{favorite.city}</span>
            </a>
          </div>
        </div>
        <PlacesList
          cards={favorite.offers}
          isOnPropertyPage={false}
          isOnFavoritesPage={true}
        />
      </li>
    })}
  </ul>
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favorites: sortFavorites(state),
});

export {FavoritesList}

export default connect(mapStateToProps, null)(FavoritesList)




