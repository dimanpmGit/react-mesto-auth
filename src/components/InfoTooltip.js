
export default function InfoTooltip(props) {
  return (
    <div className={"popup"}>
      <div className="popup__container">
        <button className="popup__close-button link" aria-label="Close" type="button"></button>
        <div className="popup__info-wrapper">
          <img className="popup__info-image" src={props.imgPath} alt={props.titleText} ></img>
          <h2 className="popup__info-title">{props.titleText}</h2>
        </div>
      </div>
    </div>
  );
}