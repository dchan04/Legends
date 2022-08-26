import "./Navbar.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        <h2>Legends</h2>
        <img
          src="https://www.mobafire.com/images/tft/set7/augment/icon/dragon-alliance.png"
          width={"auto"}
          height={50}
          alt="Logo"
          className="img-Logo"
        ></img>
      </Link>

      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/legends">Little Legends</CustomLink>
      </ul>
    </nav>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
