interface Props {
  form: {
    rating?: string,
    review?: string,
    isSubmitEnabled: boolean
    isEnabled: boolean
    isSendError: boolean
  },
  id: number,
  onChange: () => void
  onSubmit: (data: object) => void
}

const ReviewsForm: React.FC<Props> = (props) => {
  const {
    form,
    id,
    onChange,
    onSubmit
  } = props;

  return <form className="reviews__form form" action="#" method="post" onSubmit={(evt) => {
    evt.preventDefault();
    const data = new FormData(evt.currentTarget);
    onSubmit({id: id, rating: data.get(`rating`), comment: data.get(`review`)});
  }}>
    <label className="reviews__label form__label" htmlFor="review">Your review</label>
    <div className="reviews__rating-form form__rating">
      <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars"
             type="radio" onChange={onChange} checked={form['rating'] === '5'} disabled={!form.isEnabled}/>
      <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars"
             type="radio" onChange={onChange} checked={form['rating'] === '4'} disabled={!form.isEnabled}/>
      <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
             type="radio" onChange={onChange}checked={form['rating'] === '3'} disabled={!form.isEnabled}/>
      <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
             type="radio" onChange={onChange} checked={form['rating'] === '2'} disabled={!form.isEnabled}/>
      <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>

      <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
             type="radio" onChange={onChange} checked={form['rating'] === '1'} disabled={!form.isEnabled}/>
      <label htmlFor="1-star" className="reviews__rating-label form__rating-label"
             title="terribly">
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"/>
        </svg>
      </label>
    </div>
    <textarea className="reviews__textarea form__textarea" id="review" name="review"
              placeholder="Tell how was your stay, what you like and what can be improved" onChange={onChange} value={form['review'] || ''} minLength={50} maxLength={300} disabled={!form.isEnabled}/>
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe
        your stay with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" type="submit" disabled={!form.isSubmitEnabled}>Submit</button>
    </div>
    {form.isSendError &&
      <p>
        <b>An error has occurred. Please try again</b>
      </p>
    }
  </form>
};

export default ReviewsForm;
