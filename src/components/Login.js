import { useState } from "react";
import Form from './Form';
import InfoTooltip from "./InfoTooltip";
import okImage from "../images/ok.svg";
import notOkImage from "../images/not-ok.svg";

export default function Login() {

  const [loginSettings] = useState({
    title: "Вход",
    buttonText: "Войти",
    titleTextOk: "Вы успешно зарегистрировались!",
    titleTextNotOk: "Что-то пошло не так! Попробуйте еще раз."
  });
  return (
    <div className="login">
      <Form title={loginSettings.title} buttonText={loginSettings.buttonText} />
      <InfoTooltip imgPath={okImage} titleText={loginSettings.titleTextOk} />
      <InfoTooltip imgPath={notOkImage} titleText={loginSettings.titleTextNotOk} />
    </div>
  )
}