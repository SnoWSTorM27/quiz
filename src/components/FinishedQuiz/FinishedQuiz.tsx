import React from 'react';
import { IQuestion } from '../../models/models';
import classes from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

type FinishedQuizProps = {
  quiz: IQuestion[],
  results: object,
  onRetry: () => void
}

function FinishedQuiz({ quiz, results, onRetry }: FinishedQuizProps) {
  const successCount = Object.keys(results).reduce((total, key) => {
    
    if (results[key] === 'success') {
      total++
    }
    return total;
  }, 0)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        { quiz.map((item) => {
          return (
            <li key={item.id}>
              <strong>{item.id}. </strong>
              {item.question}
              { results[item.id] === 'error'
                ? <i className={'fa fa-times ' + classes.error} />
                : <i className={'fa fa-check ' + classes.success} />
              }
            </li>
          );
          }) }
      </ul>
      <p>Правильно {successCount} из {quiz.length}</p>

      <div>
        <Button onClick={onRetry} type='primary' disabled={false} >Повторить</Button>
        <Link to="/" onClick={onRetry}>
          <Button type='success' disabled={false} >Перейти в список тестов</Button>
        </Link>
      </div>
    </div>
  )
}

export default FinishedQuiz;