import okImage from "../images/ok.svg";
export default function InfoTooltip() {
  return (
    <div className={"popup"}>
      <div className="popup__container">
        <button className="popup__close-button link" aria-label="Close" type="button"></button>
        <img src={okImage} alt="Вы успешно зарегистрировались"></img>
        <h2 className="popup__title">Вы успешно зарегистрировались!</h2>
      </div>
    </div>
  );
}