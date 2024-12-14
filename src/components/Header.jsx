import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [activeButton, setActiveButton] = useState(""); // Состояние активной кнопки

  const handleButtonClick = (button) => {
    setActiveButton(button); // Обновляем активную кнопку
  };

  const buttonStyle = (button) => ({
    backgroundColor: activeButton === button ? "#8D4BFF" : "transparent", // Изменяем цвет для активной кнопки
    color: activeButton === button ? "white" : "white",
    padding: "10px 20px",
    border: "1px solid #8D4BFF",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
    textDecoration: "none",
  });

  return (
    <div className="container">
      <nav style={{ margin: "24px 0" }}>
        <NavLink
          to="/"
          style={buttonStyle("home")}
          onClick={() => handleButtonClick("home")}
        >
          Главная
        </NavLink>
        <NavLink
          to="/favorites"
          style={buttonStyle("favorites")}
          onClick={() => handleButtonClick("favorites")}
        >
          Избранные
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
