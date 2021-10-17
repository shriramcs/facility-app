import { NavLink } from "react-router-dom";
import { routeLinks } from "../../common/routes";


const NavBar = () => {
    return (
        <ul className="navbar">
            {routeLinks.map((link, index) => <li key={index}>
                <NavLink to={link.routeToPath} exact activeClassName="active">{link.displayName}</NavLink>
            </li>)}
        </ul>
    )
};

export default NavBar;