import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import BookDetailPage from "./pages/BookDetailPage";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
