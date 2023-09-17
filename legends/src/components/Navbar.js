import "./Navbar.css";
import { AppBar, List } from "@mui/material";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import logoImg from "./assets/websitelogo.png";
export default function Navbar() {
	return (
		<AppBar position="static">
			<div className="navbar">
				<div className="logo-container">
					<img src={logoImg} alt="Website logo"></img>
				</div>
				<List dense={true}>
					<CustomLink to="/Legends">Home</CustomLink>
					<CustomLink to="/legendstats">Little Legends</CustomLink>
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
