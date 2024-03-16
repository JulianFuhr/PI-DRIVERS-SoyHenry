import reducer from "./reducer";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(reducer, applyMiddleware(thunk));

export default store;