import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-primary p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive
                ? "bg-secondary text-light"
                : "text-light hover:bg-secondary"
            }`
          }
        >
          Главная
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive
                ? "bg-secondary text-light"
                : "text-light hover:bg-secondary"
            }`
          }
        >
          Избранные
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
