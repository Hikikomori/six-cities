import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App from './components/app/app';
import createAPI from './api';
import reducer from "./reducer/reducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import history from './history';

const init = () => {
  const api = createAPI(() => history.push(`/login`));
  const store = createStore(
      reducer,
      composeWithDevTools(
          applyMiddleware(thunk.withExtraArgument(api))
      )
  );

  ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.querySelector(`#root`)
  );
};

init();
