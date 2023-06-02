import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './index.css';
const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__logo--inner">
                        <img src="/public/assets/img/logo.svg" alt="logo" className="header__logo" />
                    </Link>

                    <nav className="header__nav">
                        <NavLink to="/routes" className="header__nav--link">
                            Маршруты
                        </NavLink>

                        <NavLink to="/stops" className="header__nav--link">
                            Остановки
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default Header;