import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to="/">Главная</Link> | <Link to="/favorites">Избранные</Link>
    </nav>
  );
};

export default Header;
