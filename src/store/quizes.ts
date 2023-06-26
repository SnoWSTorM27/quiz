import { createSlice } from "@reduxjs/toolkit";
import quizService from "../services/quiz.service";

const quizesSlice = createSlice({
  name: "quizes",
  initialState: {
    entities: null,
    error: null,
    isLoading: true,
    dataLoaded: false,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null,
    quizLoading: true
  },
  reducers: {
    quizesRequested: (state) => {
      state.isLoading = true;
    },
    quizesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    quizesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    quizRequested: (state) => {
      state.quizLoading = true;
    },
    quizReceived: (state, action) => {
      state.quiz = state.entities[action.payload];
      state.quizLoading = false;
    },
    quizRequestFailed: (state, action) => {
      state.error = action.payload;
      state.quizLoading = false;
    },
    quizSetAnserState: (state, action) => {
      state.answerState = action.payload;
    },
    quizSetResultState: (state, action) => {
      state.results = Object.assign(state.results, action.payload);
    },
    finishQuiz: (state) => {
      state.isFinished = true;
    },
    quizRetry: (state) => {
      state.isFinished = false;
      state.activeQuestion = 0;
      state.answerState = null;
      state.results = {};
    },
    quizNextQuestion: (state, action) => {
      state.answerState = null;
      state.activeQuestion = action.payload;
    }
  }
});

const { actions, reducer: quizesReducer } = quizesSlice;
const {
  quizesRequested,
  quizesReceived, 
  quizesRequestFailed, 
  quizRequested, 
  quizReceived, 
  quizRequestFailed,
  quizSetAnserState,
  quizSetResultState,
  finishQuiz,
  quizRetry,
  quizNextQuestion
} = actions;

export const loadQuizesList = () => async(dispatch) => {
  dispatch(quizesRequested());
  try {
    const content = await quizService.get();
    dispatch(quizesReceived(content));
  } catch (error) {
    dispatch(quizesRequestFailed(error.message));
  }
};
export const fetchQuiz = (id) => (dispatch) => {
  dispatch(quizRequested());
  try {
    dispatch(quizReceived(id));
  } catch (error) {
    dispatch(quizRequestFailed(error.message));
  }
};

export const quizAnswerClick = (answerId) => (dispatch, getState) => {
  const state = getState().quizes;
  
  if (state.answerState) {
    const key = Object.keys(state.answerState)[0];
    if (state.answerState[key] === 'success') {
      return
    }
  }

  const question = state.quiz[state.activeQuestion];
  const results = state.results;
  
  if (question.rightAnswerId === answerId) {
    if (!results[question.id]) {
      dispatch(quizSetResultState({ [question.id]: 'success' }));
    }

    dispatch(quizSetAnserState({ [answerId]: 'success' }));

    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz());
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1));
      }

      window.clearTimeout(timeout);
    }, 1000);

  } else {
    dispatch(quizSetResultState({ [question.id]: 'error' }));
    dispatch(quizSetAnserState({ [answerId]: 'error' }));
    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz());
      } else {
        dispatch(quizNextQuestion(state.activeQuestion + 1));
      }

      window.clearTimeout(timeout);
    }, 1000);
  }

};

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
};

export const retryQuiz = () => (dispatch) => {
  dispatch(quizRetry());
};

export const getQuizState = () => (state) => state.quizes;
export const getQuizes = () => (state) => state.quizes.entities;
export const getQuizesLoadingStatus = () => (state) => state.quizes.isLoading;
export const getQuizesDataStatus = () => (state) => state.quizes.dataLoaded;

export const fetchQuizCurrent = () => (state) => {
  if (state.quizes.quiz) {
    return state.quizes.quiz;
  }
};

export default quizesReducer;