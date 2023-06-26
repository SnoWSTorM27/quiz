import React from 'react';
import classes from './AnswersList.module.css';
import { IAnswer } from '../../../models/models';
import AnswerItem from './AnswerItem/AnswerItem';

type AnswersListProps = {
  answers: IAnswer[],
  onAnswerClick: (id: number) => void,
  state: object
}

function AnswersList({ answers, onAnswerClick, state }: AnswersListProps) {
  return (
    <ul className={classes.AnswersList}>
     { answers.map((answer,index) => (
      <AnswerItem
        key={index}
        answer={answer}
        onAnswerClick={onAnswerClick}
        state={state ? state[answer.id] : null}/>
     )) }
    </ul>
  )
}

export default AnswersList;