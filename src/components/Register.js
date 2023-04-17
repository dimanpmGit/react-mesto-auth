import Form from './Form';
import { useState } from "react";

export default function Register() {

  const [registerSettings] = useState({
    title: "Регистрация",
    buttonText: "Зарегистрироваться"
  });
  return (
    <div className="register">
      <Form title={registerSettings.title} buttonText={registerSettings.buttonText} />
      <a className='register__link link' href='#'>Уже зарегистрированы? Войти</a>
    </div>
  )
}