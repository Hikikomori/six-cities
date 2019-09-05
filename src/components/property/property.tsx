import {connect} from "react-redux";

import {ActionCreator as baseAction} from "../../reducer/base/base";
import {Operation as favoritesOperation} from "../../reducer/favorites/favorites";

import {Card} from '../../types'

import Reviews from '../reviews/reviews'
import Map from '../map/map'
import PlacesList from "../places-list/places-list";

const {setActiveOffer} = baseAction;

const {changeOfferFavoriteState} = favoritesOperation;

interface Props {
  id: number
  offers: Array<Card>,
  activeOffer?: Card
  setActiveOffer: (offer: Card) => void
  changeOfferFavoriteState: (data: {id: number, state: number}) => void
}

const Property: React.FC<Props> = (props) => {
  enum settings {
    MAX_IMAGES = 6,
    RATING_MULTIPLIER = 20,
    SLICE_START = 1,
    SLICE_END = 4
  }

  const {
    id,
    offers,
    activeOffer,
    setActiveOffer,
    changeOfferFavoriteState} = props;

  if(activeOffer) {
    setActiveOffer(null);
  }

  const calcDistance = (lat1, lon1, lat2, lon2) => {
    enum params {
      DEGREES_IN_RADIAN = 180,
      EARTH_RADIUS = 637,
      DIVIDER = 2
    }

    const dLat = (lat2 - lat1) * Math.PI / params.DEGREES_IN_RADIAN;
    const dLon = (lon2 - lon1) * Math.PI / params.DEGREES_IN_RADIAN;

    const a = Math.sin(dLat / params.DIVIDER) * Math.sin(dLat / params.DIVIDER) +
      Math.cos(lat1 * Math.PI / params.DEGREES_IN_RADIAN) * Math.cos(lat2 * Math.PI / params.DEGREES_IN_RADIAN) *
      Math.sin(dLon / params.DIVIDER) * Math.sin(dLon / params.DIVIDER)
    ;

    const angle = params.DIVIDER * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return params.EARTH_RADIUS * angle;
  };

  const currentOffer: Card = offers.find((offer) => {
    return offer.id === id;
  });

  const nearestPlaces: Array<Card> = offers.map((offer) => {
    offer.distance = calcDistance(currentOffer.location.latitude, currentOffer.location.longitude, offer.location.latitude, offer.location.longitude);
    return offer
  }).sort((a, b) => {
    return a.distance - b.distance
  }).slice(settings.SLICE_START, settings.SLICE_END);



  return <main className="page__main page__main--property">
    <section className="property">
      <div className="property__gallery-container container">
        <div className="property__gallery">
          {currentOffer.images.map((image, i) => {
            if (i < settings.MAX_IMAGES){
              return <div className="property__image-wrapper" key={i}>
                <img className="property__image" src={image} alt="image"/>
              </div>
            }

            return false;
          })}
        </div>
      </div>
      <div className="property__container container">
        <div className="property__wrapper">
          {currentOffer.isPremium &&
            <div className="property__mark">
            <span>Premium</span>
            </div>
          }
          <div className="property__name-wrapper">
            <h1 className="property__name">
              {currentOffer.title}
            </h1>
            <button className={`property__bookmark-button button ${currentOffer.isFavorite ? `property__bookmark-button--active` : ``}`} type="button" onClick={() => {
              changeOfferFavoriteState({id: id, state: Number(!currentOffer.isFavorite)})
            }}>
              <svg className="property__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"/>
              </svg>
              <span className="visually-hidden">{currentOffer.isFavorite ? `In bookmarks` : `To bookmarks`}</span>
            </button>
          </div>
          <div className="property__rating rating">
            <div className="property__stars rating__stars">
              <span style={{width: Math.round(currentOffer.rating) * settings.RATING_MULTIPLIER + `%`}}/>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="property__rating-value rating__value">{Math.round(currentOffer.rating)}</span>
          </div>
          <ul className="property__features">
            <li className="property__feature property__feature--entire">
              {currentOffer.type}
            </li>
            <li className="property__feature property__feature--bedrooms">
              {currentOffer.bedrooms} Bedrooms
            </li>
            <li className="property__feature property__feature--adults">
              Max {currentOffer.maxAdults} adults
            </li>
          </ul>
          <div className="property__price">
            <b className="property__price-value">&euro;{currentOffer.price}</b>
            <span className="property__price-text">&nbsp;night</span>
          </div>
          <div className="property__inside">
            <h2 className="property__inside-title">What&apos;s inside</h2>
            <ul className="property__inside-list">
              {currentOffer.goods.map((good, i) => {
                return <li className="property__inside-item" key={i}>
                  {good}
                </li>
              })}
            </ul>
          </div>
          <div className="property__host">
            <h2 className="property__host-title">Meet the host</h2>
            <div className="property__host-user user">
              <div className={`property__avatar-wrapper user__avatar-wrapper ${currentOffer.host.isPro ? `property__avatar-wrapper--pro` : ``}`}>
                <img className="property__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74"
                     alt="Host avatar"/>
              </div>
              <span className="property__user-name">
                  {currentOffer.host.name}
              </span>

              {currentOffer.host.isPro &&
                <span className="property__user-status">
                    Pro
                </span>
              }
            </div>
            <div className="property__description">
              <p className="property__text">
                {currentOffer.description}
              </p>
            </div>
          </div>
          <Reviews
            id={id}
          />
        </div>
      </div>
      <Map
        activeOffer={currentOffer}
        offers={nearestPlaces}
        isOnPropertyPage={true}
      />
    </section>
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <PlacesList
          cards={nearestPlaces}
          isOnPropertyPage={true}
          isOnFavoritesPage={false}
        />
      </section>
    </div>
  </main>;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offers: state.BASE.allOffers,
  activeOffer: state.BASE.activeOffer,
});


const mapDispatchToProps = {
  setActiveOffer,
  changeOfferFavoriteState,
};

export {Property};

export default connect(mapStateToProps, mapDispatchToProps)(Property)
