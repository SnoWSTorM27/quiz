import React from 'react';
import { IAnswer } from '../../../../models/models';
import classes from './AnswerItem.module.css';

type AnswerItemProps = {
  answer: IAnswer,
  onAnswerClick: (id: number) => void,
  state: string
}

function AnswerItem({ answer, onAnswerClick, state }: AnswerItemProps) {
  const cls = [classes.AnswerItem]

  if (state) {
    cls.push(classes[state])
  }
  return (
    <li
      className={cls.join(' ')}
      onClick={() => onAnswerClick(answer.id)}
    >
      {answer.text}
    </li>
  )
}

export default AnswerItem