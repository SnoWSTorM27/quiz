import React, { useEffect } from 'react';
import classes from './Quiz.module.css';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuiz, getQuizState, quizAnswerClick, retryQuiz } from '../../store/quizes';

interface QuizProps {}

export default function Quiz({}: QuizProps) {
  const { quizId } = useParams();
  const state = useSelector(getQuizState());
  const dispatch = useDispatch<any>();
  

  useEffect(() => {
    dispatch(fetchQuiz(quizId));
    return () => {
      retryHandler();
    }
  }, []);

  const onAnswerClickHandler = (id) => {
    dispatch(quizAnswerClick(id));
  }

  const retryHandler = () => {
    dispatch(retryQuiz());
  };

  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>
        { state.quizLoading 
          ? <Loader />
          : state.isFinished
            ? <FinishedQuiz
                results={state.results}
                quiz={state.quiz}
                onRetry={retryHandler}
              />
            :
              <ActiveQuiz
                answers={state.quiz[state.activeQuestion].answers}
                question={state.quiz[state.activeQuestion].question}
                onAnswerClick={onAnswerClickHandler}
                quizLength={state.quiz.length}
                answerNumber={state.activeQuestion + 1}
                state={state.answerState}
              />
        }
      </div>
    </div>
  )
}