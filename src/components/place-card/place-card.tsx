import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {Card} from '../../types'

import {ActionCreator as baseAction} from "../../reducer/base/base";
import {Operation as favoritesOperation} from "../../reducer/favorites/favorites";

const {setActiveOffer} = baseAction;

const {changeOfferFavoriteState} = favoritesOperation;

interface Props {
  card: Card,
  setActiveOffer: (card: Card) => void,
  isOnPropertyPage: boolean
  isOnFavoritesPage: boolean
  changeOfferFavoriteState: (data: {id: number, state: number}) => void
}

const PlaceCard: React.FC<Props> = (props) => {
  const RATING_MULTIPLIER = 20;
  const {
    card,
    setActiveOffer,
    isOnPropertyPage,
    isOnFavoritesPage,
    changeOfferFavoriteState} = props;

  return <article className={`${isOnPropertyPage ? `near-places__card` : `${isOnFavoritesPage ? `favorites__card` : `cities__place-card`}`} place-card`}>
    {card.isPremium && !isOnFavoritesPage &&
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
    }
    <div className={`${isOnFavoritesPage ? `favorites__image-wrapper` : `cities__image-wrapper`} place-card__image-wrapper`}>
      {isOnPropertyPage || isOnFavoritesPage ?
        <img className="place-card__image" src={card.image} width="260" height="200" alt="Place image"/> :
        <a href="#" onClick={(evt) => {
          evt.preventDefault();
          setActiveOffer(card);
        }}>
          <img className="place-card__image" src={card.image} width="260" height="200" alt="Place image"/>
        </a>
      }
    </div>
    <div className={`${isOnFavoritesPage ? `favorites__card-info` : ``} place-card__info`}>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{card.price} </b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={`place-card__bookmark-button button ${card.isFavorite ? `place-card__bookmark-button--active` : ``}`} type="button"  onClick={() => {
          changeOfferFavoriteState({id: card.id, state: card.isFavorite ? 0 : 1})
        }}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"/>
          </svg>
          <span className="visually-hidden">{card.isFavorite ? `In bookmarks` : `To bookmarks`}</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: Math.round(card.rating) * RATING_MULTIPLIER + `%`}}/>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        {isOnPropertyPage ? card.title : <Link to={`/offer/${card.id}`}>{card.title}</Link>}
      </h2>
      <p className="place-card__type">{card.type}</p>
    </div>
  </article>;
};

const mapDispatchToProps = {
  setActiveOffer,
  changeOfferFavoriteState,
};

export {PlaceCard}

export default connect(null, mapDispatchToProps)(PlaceCard);
