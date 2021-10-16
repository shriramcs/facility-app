import { NavLink } from "react-router-dom";


const NavBar = () => (
    <ul className="navbar">
        <li>
            <NavLink to="/" exact activeClassName="active">Home</NavLink>
        </li>
        <li>
            <NavLink to="/facility" activeClassName="active">Facility</NavLink>
        </li>
        <li>
            <NavLink to="/admin" activeClassName="active">Admin</NavLink>
        </li>
        <li>
            <NavLink to="/mytournaments" activeClassName="active">My tournaments</NavLink>
        </li>
    </ul>
);

export default NavBar;