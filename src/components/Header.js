import { Link } from "react-router-dom";
import EmailLink from "./EmailLink";

function Header(props) {
  return (    
    <header className="header">
      <div className="logo"></div>
      <nav className="header__nav-menu">
        {props.email ? <EmailLink email={props.email}/> : ""}
        <Link className="header__nav-link link" to="/">
          {props.menuItem}
        </Link>
      </nav>
    </header>
  );
}

export default Header;