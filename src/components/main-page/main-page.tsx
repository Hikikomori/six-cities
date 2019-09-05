import {connect} from "react-redux";

import {Card} from '../../types'

import {sortOffers} from "../../reducer/base/selectors";

import CitiesList from '../cities-list/cities-list';
import Sorting from '../sorting/sorting';
import PlacesList from '../places-list/places-list';
import Map from '../map/map';

interface Props {
  city: string,
  offers: Array<Card>,
  activeOffer?: Card,
}

const MainPage: React.FC<Props> = (props) => {
  const {
    city,
    offers,
    activeOffer} = props;

  return <main className="page__main page__main--index">
    <h1 className="visually-hidden">Cities</h1>
    <CitiesList/>
    <div className="cities__places-wrapper">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length} places to stay in {city}</b>
          <Sorting/>
          <PlacesList
            cards={offers}
            isOnPropertyPage={false}
            isOnFavoritesPage={false}
          />
        </section>
        <div className="cities__right-section">
          <Map
            offers={offers}
            activeOffer={activeOffer}
            isOnPropertyPage={false}
          />
        </div>
      </div>
    </div>

  </main>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  city: state.BASE.city,
  offers: sortOffers(state.BASE),
  activeOffer: state.BASE.activeOffer,
});

export {MainPage};

export default connect(mapStateToProps, null)(MainPage);
