import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

export default function Register() {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formValues.password) {
      setErrorMessage('Пароль не может быть пустым');
      return;
    }

    if (formValues.password !== formValues.confirmPassword) {
      setErrorMessage('Passwords are not equal!')
      return
    }
    const { password, email } = formValues;

    auth.register(email, password)
      .then(data => {
        navigate('/signin');
      })
      .catch(err => {
        setErrorMessage(err)
      })
  }

  return (
    <div className='register'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Регистрация</h1>
        <input className='form__input' placeholder='Email' name='email' autoComplete='email' value={formValues.email} onChange={handleChange} />
        <input className='form__input' placeholder='Пароль' name='password' autoComplete='new-password' value={formValues.password} onChange={handleChange} />
        <input className='form__input' placeholder='Подтвердите пароль' name='confirmPassword' autoComplete='new-password' value={formValues.confirmPassword} onChange={handleChange} />
        <button className='form__button'>Зарегистрироваться</button>
      </form>
      <div className='register__signin' href='#'>
        Уже зарегистрированы?&nbsp;
        <Link to='/signin' className='register__signin-link link'>Войти</Link>
      </div>
    </div>
  )
}