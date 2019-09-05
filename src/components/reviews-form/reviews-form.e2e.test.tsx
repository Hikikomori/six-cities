import {shallow} from 'enzyme';
import ReviewsForm from "./reviews-form";

it(`When user add review form is not sent`, () => {
  const onSubmit = jest.fn();
  const reviewsForm = shallow(<ReviewsForm
    form={{
      isSubmitEnabled: true,
      isEnabled: true,
      isSendError: false
    }}
    id={1}
    onChange={jest.fn()}
    onSubmit={onSubmit}
  />);

  const form = reviewsForm.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});
