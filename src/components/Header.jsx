import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [activeButton, setActiveButton] = useState(""); // Состояние активной кнопки

  const handleButtonClick = (button) => {
    setActiveButton(button); // Обновляем активную кнопку
  };

  const buttonStyle = (button) => ({
    backgroundColor: activeButton === button ? "#007bff" : "transparent", // Изменяем цвет для активной кнопки
    color: activeButton === button ? "white" : "black",
    padding: "10px 20px",
    border: "1px solid #007bff",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer",
    textDecoration: "none",
  });

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
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
  );
};

export default Header;
