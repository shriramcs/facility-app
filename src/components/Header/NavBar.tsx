import { NavLink } from "react-router-dom";
import { routeLinks } from "../../common/routes";
import NavBarWrapper from "./NavBar.style";
import React from "react";

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        >
            <ul className="navbar mobile">
                {
                routeLinks.map((link, index) => (<MenuItem onClick={handleMenuClose} key={index}>
                        <NavLink to={link.routeToPath} exact activeClassName="active">{link.displayName}</NavLink>
                    </MenuItem>))
                }
            </ul>
        </Menu>
    );
    
    return (
        <NavBarWrapper>
            <>
            <Toolbar>
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <div className="navbar desktop">
                        {routeLinks.map((link, index) => <span key={index}>
                            <NavLink to={link.routeToPath} onClick={handleMenuClose} exact activeClassName="active">{link.displayName}</NavLink>
                        </span>)}
                    </div>
                </Box>
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            {renderMobileMenu}
            </>
        </NavBarWrapper>
    )
};

export default NavBar;