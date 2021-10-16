import * as React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderWrapper from './Header.style';

const Header: React.FC<{}> = () => {
    const logo = "TRACKMAN";
    const slogan = "GOLF"
    
    return (
        <HeaderWrapper>
            <header className="App-header">
                <div className="header__wrapper">
                    <div className="header__start">
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
                    </div>
                    <div className="header__middle">
                        <a href="/" className="App-logo">
                            {logo}
                        </a>
                        <span className="logo__slogan">
                            {slogan}
                        </span>
                    </div>
                    <div className="header__end">
                        <form>
                            <select defaultValue="shriramcs">
                                <option value="shriramcs">Shriram Sapparad</option>
                            </select>
                            <img src="https://pbs.twimg.com/profile_images/1414228698799116293/5XncAJOh_400x400.jpg" 
                                alt="shriramcs profile"/>
                            
                        </form>
                    </div>
                </div>
            </header>
        </HeaderWrapper>
    );
};

export default Header;