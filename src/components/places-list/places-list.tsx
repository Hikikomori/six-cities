import {Card} from '../../types'

import PlaceCard from '../place-card/place-card';

interface Props {
  cards: Array<Card>,
  isOnPropertyPage: boolean
  isOnFavoritesPage: boolean
}

const PlacesList: React.FC<Props> = (props) => {
  const {
    cards,
    isOnPropertyPage,
    isOnFavoritesPage} = props;

  return <div className={`${isOnPropertyPage ? `near-places__list places__list` : `${isOnFavoritesPage ? `favorites__places` : `cities__places-list tabs__content places__list`}`}`}>
    {cards.map((card, i)=>{
      return <PlaceCard
        card={card}
        isOnPropertyPage={isOnPropertyPage}
        isOnFavoritesPage={isOnFavoritesPage}
        key={i}
      />;
    })}
  </div>;
};

export default PlacesList;
