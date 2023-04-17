export default function Form(props) {
  return (
    <form className="form">
      <h1 className="form__title">{props.title}</h1>
      <input className="form__input" placeholder="Email" />
      <input className="form__input" placeholder="Пароль" />
      <button className="form__button">{props.buttonText}</button>
    </form>
  );
}