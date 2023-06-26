import React, { useState } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../../store/auth';

const validateEmail = (email) => {
  return email.match(
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

type AuthProps = {}

function Auth({}: AuthProps) {
  const [isFormValid, setFormValid] = useState(false);
  const dispatch = useDispatch<any>();
  const [formControls, setFormControls] = useState({
    email: {
      value: '',
      type: 'email',
      label: 'Email',
      error: 'Введите корректный email',
      valid: false,
      touched: false,
      validation: {
        required: true,
        email: true
      }
    },
    password: {
      value: '',
      type: 'password',
      label: 'Пароль',
      error: 'Введите корректный пароль',
      valid: false,
      touched: false,
      validation: {
        required: true,
        minLength: 6
      }
    }
  });
  function validateControl(value, validation) {
    if (!validation) {
      return true;
    }

    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    
    return isValid;
  };

  const onChangeHandler = (e, controlName) => {
    const controls = { ...formControls };
    const control = { ...formControls[controlName] };

    control.value = e.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    controls[controlName] = control;

    let isFormValid = true;

    Object.keys(controls).forEach(name => {
      isFormValid = controls[name].valid && isFormValid;
    });

    setFormControls({
      ...controls
    });
    setFormValid(isFormValid);
  };

  const handleSignIn = () => {
    const data = {
      email: formControls.email.value,
      password: formControls.password.value,
      isLogin: true
    }
    dispatch(auth(data));
  };
  const handleSignUp = () => {
    const data = {
      email: formControls.email.value,
      password: formControls.password.value,
      isLogin: false
    }
    dispatch(auth(data));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function renderInputs() {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          error={control.error}
          shouldValidate={!!control.validation}
          onChange={(e) => onChangeHandler(e, controlName)}
        />
      );
    });
  };
  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>

        <form className={classes.AuthForm} onSubmit={handleSubmit}>

          {renderInputs()}
          
          <Button
            type="success"
            onClick={handleSignIn}
            disabled={!isFormValid}
          >
            Войти
          </Button>
          <Button
            type="primary"
            onClick={handleSignUp}
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Auth;