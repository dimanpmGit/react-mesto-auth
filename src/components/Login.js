import { useState } from "react";
import Form from './Form';
import InfoTooltip from "./InfoTooltip";

export default function Login() {

  const [loginSettings] = useState({
    title: "Вход",
    buttonText: "Войти"
  });
  return (
    <div className="login">
      <Form title={loginSettings.title} buttonText={loginSettings.buttonText} />
      <InfoTooltip />
    </div>
  )
}