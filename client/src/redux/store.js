import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

// Permite utilizar "Redux dev tool":
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	// Permite hacer peticiones asíncronas:
	composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;