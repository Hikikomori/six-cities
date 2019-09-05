class OfferAdapter {
  city: {
    name: string,
    location: {
      latitude: number
      longitude: number,
      zoom: number
    }
  };
  image: string;
  images: Array<string>;
  title: string;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Array<string>;
  host: {
    id: number,
    name: string,
    isPro: boolean,
    avatarUrl: string
  };
  description: string;
  location: {
    latitude: number
    longitude: number,
    zoom: number
  };
  id: number;
  distance?: number;

  static parseOffer(data) {
    return new OfferAdapter(data);
  }

  static parseOffers(data) {
    return data.map(OfferAdapter.parseOffer);
  }

  constructor(data) {
    this.city = data[`city`];
    this.image = data[`preview_image`];
    this.images = data[`images`];
    this.title = data[`title`];
    this.isFavorite = data[`is_favorite`];
    this.isPremium = data[`is_premium`];
    this.rating = parseFloat(data[`rating`]);
    this.type = data[`type`][0].toUpperCase() + data[`type`].slice(1);
    this.bedrooms = data[`bedrooms`];
    this.maxAdults = data[`max_adults`];
    this.price = data[`price`];
    this.goods = data[`goods`];
    this.host = {
      id: data[`host`][`id`],
      name: data[`host`][`name`],
      isPro: data[`host`][`is_pro`],
      avatarUrl: data[`host`][`avatar_url`]
    };
    this.description = data[`description`];
    this.location = data[`location`];
    this.id = data[`id`];
  }
}

class ReviewAdapter {
  id: number;
  user: {
    id: number,
    name: string,
    isPro: boolean,
    avatarUrl: string
  };
  rating: number;
  comment: string;
  datetime: string;

  static parseReview(data) {
    return new ReviewAdapter(data);
  }

  static parseReviews(data) {
    return data.map(ReviewAdapter.parseReview);
  }

  constructor(data) {
    this.id = data[`id`];
    this.user = {
      id: data[`user`][`id`],
      name: data[`user`][`name`],
      isPro: data[`user`][`is_pro`],
      avatarUrl: data[`user`][`avatar_url`]
    };
    this.rating = data[`rating`];
    this.comment = data[`comment`];
    this.datetime = data[`date`];
  }
}

export {
  OfferAdapter,
  ReviewAdapter
};
