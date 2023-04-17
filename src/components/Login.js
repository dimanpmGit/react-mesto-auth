export default function Login() {
  return (
    <div className="login">
      
      <form className="form">
      <h1 className="login__title">Вход</h1>
        <input className="form__input" placeholder="Email" />
        <input className="form__input" placeholder="Пароль" />
        <button className="form__button">Войти</button>
      </form>
    </div>
  )
}