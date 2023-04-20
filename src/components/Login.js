import { useEffect } from 'react';
import AuthForm from './AuthForm';

export default function Login({ handleChange, handleSubmit, tokenCheck, formValues }) {
  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <div className='login'>
      <AuthForm title='Вход' buttonText='Войти' handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />
    </div>
  )
}