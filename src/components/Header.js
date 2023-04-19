import { Link, useNavigate, useLocation } from "react-router-dom";
import EmailLink from "./EmailLink";

function Header(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (    
    <header className="header">
      <div className="logo"></div>
      <ul className="header__nav-menu">
        {pathname === '/' && <li><EmailLink email={props.email} /></li>}
        {pathname === '/main' && <li><Link to="/signin" className="header__nav-link link">Войти</Link></li>}
        {pathname === '/signin' && <li><Link to="/signup" className="header__nav-link link">Регистрация</Link></li>}
        {pathname === '/signup' && <li><Link to="/signin" className="header__nav-link link">Войти</Link></li>}
      </ul>
    </header>
  );
}

export default Header;