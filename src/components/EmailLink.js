export default function EmailLink(props) {
  return (
    <a className="header__nav-link header__nav-link_medium link" href={props.email}>{props.email}</a>
  )
}