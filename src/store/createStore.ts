import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import creatorReducer from "./creator";
import quizesReducer from "./quizes";

const rootReducer = combineReducers({
  quizes: quizesReducer,
  creator: creatorReducer,
  auth: authReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
};