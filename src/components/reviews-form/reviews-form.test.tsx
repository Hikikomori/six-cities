import * as renderer from 'react-test-renderer';
import ReviewsForm from "./reviews-form";


it(`Reviews form correctly renders`, () => {
  const tree = renderer
    .create(
      <ReviewsForm
        form={{
          isSubmitEnabled: true,
          isEnabled: true,
          isSendError: false
        }}
        id={1}
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
