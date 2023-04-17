import Form from './Form';
import { useState } from "react";

export default function Login() {

  const [loginSettings, setLoginSettings] = useState({
    title: "Вход",
    buttonText: "Войти"
  });
  return (
    <div className="login">
      <Form title={loginSettings.title} buttonText={loginSettings.buttonText} />
    </div>
  )
}