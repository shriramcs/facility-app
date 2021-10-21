import * as React from 'react';
import AppLogin from './AppLogin';
import AppLogo from './AppLogo';
import HeaderWrapper from './Header.style';
import NavBar from './NavBar';

const Header: React.FC<{}> = () => {
    const logo = "Transport Company";
    const slogan = "SCM";

    return (
        <HeaderWrapper>
            <header className="App-header">
                <div className="header__wrapper">
                    <div className="header__start">
                        <NavBar></NavBar>
                    </div>
                    <div className="header__middle">
                        <AppLogo logo={logo} slogan={slogan}></AppLogo>
                    </div>
                    <div className="header__end">
                        <AppLogin></AppLogin>
                    </div>
                </div>
            </header>
        </HeaderWrapper>
    );
};

export default Header;