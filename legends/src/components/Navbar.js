import "./Navbar.css";
import { AppBar, Typography, List } from "@mui/material";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <div className="navbar">
        <div className="logo-container">
          <Typography className="logo-name" component="div" fontWeight={600}>
            Legends - Set 8.5 x
          </Typography>
          <div className="img-Logo" />
        </div>
        <List dense={true}>
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/legends">Little Legends</CustomLink>
        </List>
      </div>
    </AppBar>
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
