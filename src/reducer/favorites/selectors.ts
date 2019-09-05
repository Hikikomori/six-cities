import {createSelector} from "reselect";

const sortFavorites = (state) => {
  const getCities = (state) => state.BASE.cities;
  const getFavorites = (state) => state.FAVORITES.favorites;

  return createSelector(
    getFavorites, getCities,
    (favorites, cities) => {
      if (favorites !== null) {
        return cities.map((city) => {
          if (favorites.some((offer) => {
            return offer.city.name === city;
          })) {
            return {
              city,
              offers: favorites.filter((offer) => {
                return offer.city.name === city;
              })
            };
          }

          return null;
        }).filter((it) => {
          return it !== null;
        });
      }

      return null;
    }
  )(state);
};

export {sortFavorites}
