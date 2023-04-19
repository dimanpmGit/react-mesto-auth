import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as auth from './App';

export default function Login({ handleLogin }) {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    auth.getContent(token)
      .then(res => {
        handleLogin(res.data.email);
        const url = location.state?.returnUrl || '/main';
        navigate(url);
      })
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formValues.password || !formValues.email) {
      setErrorMessage('Email или пароль пуст');
      return;
    }

    auth.authorize(formValues.email, formValues.password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          tokenCheck(data.token);
          const url = location.state?.returnUrl || '/main';
          navigate(url);
        }
      })
  }

  return (
    <div className='login'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Вход</h1>
        <input className='form__input' placeholder='Email' name='email' autoComplete='email' type='email' value={formValues.email} onChange={handleChange} />
        <input className='form__input' placeholder='Пароль' name='password' autoComplete='new-password' type='password' value={formValues.password} onChange={handleChange} />
        <button className='form__button'>Войти</button>
      </form>
    </div>
  )
}