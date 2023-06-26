import React from 'react';
import { IAnswer } from '../../models/models';
import classes from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

type ActiveQuizProps = {
  answers: IAnswer[]
  question: string,
  onAnswerClick: (id: number) => void
  quizLength: number,
  answerNumber: number,
  state: object
}

function ActiveQuiz({answers, question, onAnswerClick, quizLength, answerNumber, state}: ActiveQuizProps) {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}. </strong>
          {question}
        </span>

        <small>{answerNumber} из {quizLength}</small>
      </p>

      <AnswersList answers={answers} onAnswerClick={onAnswerClick} state={state}/>
    </div>
  )
}

export default ActiveQuiz