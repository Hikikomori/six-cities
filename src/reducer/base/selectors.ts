import {createSelector} from "reselect";

const sortOffers = (state) => {
  const getOffers = (state) => state.allOffers;
  const getCity = (state) => state.city;
  const getSorting = (state) => state.sorting;

  const filterOffers = createSelector(
    getOffers, getCity,
    (offers, city) => {
      return offers.filter((offer) => {
        return offer.city.name === city;
      });
    }
  );

  return createSelector(
    filterOffers, getSorting,
    (offers, sorting) => {
      switch (sorting) {
        case `Popular`:
          return offers;
        case `Price: low to high`:
          return offers.slice().sort((a, b) =>{
            return a.price - b.price;
          });
        case `Price: high to low`:
          return offers.slice().sort((a, b) =>{
            return  b.price - a.price;
          });
        case `Top rated first`:
          return offers.slice().sort((a, b) =>{
            return b.rating - a.rating;
          });
      }
    }
  )(state);
};

export {sortOffers};
