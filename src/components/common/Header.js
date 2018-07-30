import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <NavLink to="/" activeClassName="active">
                Home
            </NavLink>
        </nav>
    );
};

export default Header;
