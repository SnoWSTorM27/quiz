import { createSlice } from "@reduxjs/toolkit";
import quizService from "../services/quiz.service";

const creatorSlice = createSlice({
  name: "creator",
  initialState: {
    quiz: [],
    isLoading: false,
    error: null
  },
  reducers: {
    questionCreateRequested: (state) => {
      state.isLoading = true;
    },
    questionCreateReceived: (state, action) => {
      state.quiz.push(action.payload);
      state.isLoading = false;
    },
    questionCreateRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    quizCreateRequested: (state) => {
      state.isLoading = true;
    },
    quizCreateReceived: (state) => {
      state.quiz = [];
      state.isLoading = false;
    },
    quizCreateRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: creatorReducer } = creatorSlice;
const {
  questionCreateRequested,
  questionCreateReceived,
  questionCreateRequestFailed,
  quizCreateRequested,
  quizCreateReceived,
  quizCreateRequestFailed
} = actions;

export const finishCreateQuiz = () => async(dispatch, getState) => {
  const quiz = getState().creator.quiz;
  
  dispatch(quizCreateRequested());
  try {
    await quizService.create(quiz);
    dispatch(quizCreateReceived());
  } catch (error) {
    dispatch(quizCreateRequestFailed(error.message));
  }
};
export const createQuizQuestion = (item) => (dispatch) => {
  dispatch(questionCreateRequested());
  try {
    dispatch(questionCreateReceived(item));
  } catch (error) {
    dispatch(questionCreateRequestFailed(error.message));
  }
};

export const getQuizCreator = () => (state) => state.creator.quiz;
export const getQuizCreatorLoadingStatus = () => (state) => state.creator.isLoading;

export default creatorReducer;