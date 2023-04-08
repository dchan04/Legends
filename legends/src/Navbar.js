import "./Navbar.css";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  List,
  Divider,
  makeStyles,
} from "@mui/material";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" className="navbar">
      <a className="logo-container">
        <Typography variant="h5" component="div" fontWeight={800}>
          Legends - Set 8.5
        </Typography>
        <div className="img-Logo"></div>
      </a>
      <List>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/legends">Little Legends</CustomLink>
      </List>
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
