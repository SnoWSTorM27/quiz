import React from 'react';
import classes from './QuizList.module.css';
import { Link } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import { useSelector } from "react-redux";
import { getQuizes, getQuizesLoadingStatus } from '../../store/quizes';

type QuizListProps = {}

function QuizList({}: QuizListProps) {
  const quizes = transformData(useSelector(getQuizes()));
  const isLoading = useSelector(getQuizesLoadingStatus());

  function transformData(data) {
    const quizes = [];
    Object.keys(data).forEach((key, index) => {
      quizes.push({
        id: key,
        name: `Тест №${index + 1}`
      })
    });
    return quizes;
  };
  function renderQuizes() {
    return quizes.map((quiz) => (
      <li key={quiz.id}>
        <Link to={`/quiz/${quiz.id}`}>
          {quiz.name}
        </Link>
      </li>
    ))
  };

  return (
    <div className={classes.QuizList}>
      <div>
      <h1>Список викторин</h1>
        { isLoading ? <Loader /> : <ul>{ renderQuizes() }</ul> }
      </div>
    </div>
  )
}

export default QuizList;