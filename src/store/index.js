import { createStore, compose, applyMiddleware } from "redux";

import reducer from "./reducers";

const composer = __DEV__
  ? compose(
      applyMiddleware(...[]),
      console.tron.createEnhancer()
    )
  : applyMiddleware(...[]);
//É necessario passar uma função que retorna um estado
const store = createStore(reducer, composer);

export default store;
