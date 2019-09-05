import {Review} from '../../types'

import ReviewsItem from '../reviews-item/reviews-item'

interface Props {
  reviews: Array<Review>
}

const ReviewsList:React.FC<Props> = (props) => {
  const {reviews} = props;

  return <ul className="reviews__list">
    {reviews.sort((a, b) => {
      return Date.parse(b.datetime) - Date.parse(a.datetime)
    }).map((review, i)=>{
      if (i < 10) {
        return <ReviewsItem
          review={review}
          key={i}
        />;
      }
    })}
  </ul>
};

export default ReviewsList
