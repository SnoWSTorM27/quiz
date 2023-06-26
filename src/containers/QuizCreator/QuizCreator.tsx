import React, { useEffect, useState } from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './QuizCreator.module.css';
import { createControl, validate, validateForm } from '../../utils/formFramework';
import Input from '../../components/UI/Input/Input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Select from '../../components/UI/Select/Select';
import httpService from '../../services/http.service';
import { useSelector, useDispatch } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz, getQuizCreator } from '../../store/creator';

function createOptionControl(number) {
  return createControl({
    label: `Вариант ${number}` ,
    error: 'Значение не может быть пустым',
    id: number
  }, {required: true})
};

function createFormControl() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      error: 'Вопрос не может быть пустым'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
};

type QuizCreatorProps = {}

function QuizCreator({}: QuizCreatorProps) {
  // const [quiz, setQuiz] = useState([]);
  const quiz = useSelector(getQuizCreator());
  const [rightAnswerId, setRightAnswerId] = useState(null);
  const [isFormValid, setFormValid] = useState(false);
  const [formControls, setFormControls] = useState(createFormControl());
  const dispatch = useDispatch<any>();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleAddQuestion = async(e) => {
    e.preventDefault();

    const { question, option1, option2, option3, option4 } = formControls;

    const questionItem = {
      question: question.value,
      id: quiz.length + 1,
      rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }
    // copyQuiz.push(questionItem);
    await dispatch(createQuizQuestion(questionItem));
    setFormValid(false)
    setRightAnswerId(1)
    setFormControls(createFormControl());
  };

  const handleCreateQuiz = async(e) => {
    e.preventDefault();
    
    setFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControl());
    dispatch(finishCreateQuiz());
  };

  const handleChange = (value, controlName) => {
    const controls = { ...formControls };
    const control = { ...formControls[controlName] };
    
    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    controls[controlName] = control;

    setFormControls({
      ...controls
    });
    setFormValid(validateForm(controls));
  };

  const handleSelectChange = (e) => {
    setRightAnswerId(Number(e.target.value));
  };

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];

      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            error={control.error}
            onChange={e => handleChange(e.target.value, controlName)}
          />
          { index === 0 ? <hr /> : null }
        </Auxiliary>
      )
    })
  };

  const select = <Select 
    label="Выберите правильный ответ"
    value={String(rightAnswerId)}
    onChange={handleSelectChange}
    options={[
      {text: 1, value: 1},
      {text: 2, value: 2},
      {text: 3, value: 3},
      {text: 4, value: 4}
    ]}
  />
  return (
    <div className={classes.QuizCreator}>
      <div className="">
        <h1>Создание викторины</h1>
        <form onSubmit={handleSubmit}>

          {renderControls()}

          { select }

          <Button
            type="primary"
            onClick={handleAddQuestion}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>
          <Button
            type="success"
            onClick={handleCreateQuiz}
            disabled={quiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  )
}

export default QuizCreator;