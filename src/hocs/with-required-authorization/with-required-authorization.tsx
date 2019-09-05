import * as ReactRouterDOM from 'react-router-dom'
const Redirect = ReactRouterDOM.Redirect;

const withRequiredAuthorization = (Component, isUserLoggedIn) => {
  type Props = React.ComponentProps<typeof Component>

  const WithRequiredAuthorization: React.FC<Props> = (props) => {
    if (!isUserLoggedIn) {
      return <Redirect to="/login" />;
    }

    return <Component
      {...props}
    />;
  };

  return WithRequiredAuthorization;
};

export default withRequiredAuthorization;

