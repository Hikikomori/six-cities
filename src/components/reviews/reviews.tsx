import {connect} from "react-redux";

import {ActionCreator as reviewsAction, Operation as reviewsOperation} from "../../reducer/reviews/reviews";

import {Review} from "../../types";

import ReviewsList from '../reviews-list/reviews-list'
import ReviewsForm from '../reviews-form/reviews-form'
import withFormValidation from '../../hocs/with-form-validation/with-form-validation';

const {
  setReviewsLoadedFlag,
  setReviewFormErrorFlag,
  setReviewFormSuccessFlag} = reviewsAction;

const {
  getReviews,
  addComment} = reviewsOperation;

interface Props {
  id: number
  reviews: Array<Review>,
  getReviews: (id: number) => void
  setReviewsLoadedFlag: (flag: boolean) => void
  isReviewsLoaded: boolean
  addComment: (data: {id: number, rating: number, comment: string}) => void
  isReviewFormSendError: boolean
  isReviewFormSendSuccess: boolean
  setReviewFormErrorFlag: (flag: boolean) => void
  setReviewFormSuccessFlag: (flag: boolean) => void
  isUserLoggedIn: boolean
}

const ReviewsFormWrapped = withFormValidation(ReviewsForm);

class Reviews extends React.PureComponent<Props> {
  constructor(props){
    super(props);

    this.props.setReviewsLoadedFlag(false);
  }

  render(){
    const {
      isReviewsLoaded,
      reviews,
      id,
      addComment,
      isReviewFormSendError,
      isReviewFormSendSuccess,
      setReviewFormErrorFlag,
      setReviewFormSuccessFlag,
      isUserLoggedIn}  = this.props;

    if (isReviewsLoaded) {
      return <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
        <ReviewsList
          reviews={reviews}
        />
        {isUserLoggedIn && <ReviewsFormWrapped
          id={id}
          validation={(state) => {
            return state.form.hasOwnProperty('rating') && state.form.hasOwnProperty('review') && state.form['review'].length > 50;
          }}
          onSubmit={addComment}
          isFormSendError={isReviewFormSendError}
          isFormSendSuccess={isReviewFormSendSuccess}
          onSetFormErrorFlag={setReviewFormErrorFlag}
          onSetFormSuccessFlag={setReviewFormSuccessFlag}
        />}
      </section>
    }

    return null;
  }

  componentDidMount() {
    const {id, getReviews} = this.props;
    getReviews(id);
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  reviews: state.REVIEIWS.reviews,
  isReviewsLoaded: state.REVIEIWS.isReviewsLoaded,
  isReviewFormSendError: state.REVIEIWS.isReviewFormSendError,
  isReviewFormSendSuccess: state.REVIEIWS.isReviewFormSendSuccess,
  isUserLoggedIn: state.USER.isUserLoggedIn,
});


const mapDispatchToProps = {
  getReviews,
  setReviewsLoadedFlag,
  addComment,
  setReviewFormErrorFlag,
  setReviewFormSuccessFlag,
};

export {Reviews}

export default connect(mapStateToProps, mapDispatchToProps)(Reviews)
