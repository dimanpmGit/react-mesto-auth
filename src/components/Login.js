import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import okImage from '../images/ok.svg';
import notOkImage from '../images/not-ok.svg';
import * as auth from '../utils/auth';

export default function Login({ handleLogin }) {

  const [formValues, setFormValues] = useState({
    titleTextOk: 'Вы успешно зарегистрировались!',
    titleTextNotOk: 'Что-то пошло не так! Попробуйте еще раз.',
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
        handleLogin(res);
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
      setErrorMessage('Email or password are empty');
      return;
    }

    auth.authorize(formValues.email, formValues.password)
      .then(data => {
        console.log(data.token);
        if (data.token) {
          localStorage.setItem('token', data.token);
          handleLogin(data.email);
          const url = location.state?.returnUrl || '/main';
          navigate(url);
        }
      })
  }

  return (
    <div className='login'>
      <form className='form' onSubmit={handleSubmit}>
        <h1 className='form__title'>Вход</h1>
        <input className='form__input' placeholder='Email' name='email' autoComplete='email' value={formValues.email} onChange={handleChange} />
        <input className='form__input' placeholder='Пароль' name='password' autoComplete='new-password' value={formValues.password} onChange={handleChange} />
        <button className='form__button'>Войти</button>
      </form>
      {/*<InfoTooltip imgPath={okImage} titleText={loginSettings.titleTextOk} />}
      <InfoTooltip imgPath={notOkImage} titleText={loginSettings.titleTextNotOk} />*/}
    </div>
  )
}