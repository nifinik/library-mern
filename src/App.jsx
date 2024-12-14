import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import BookDetailPage from "./pages/BookDetailPage";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-dark text-light">
        <Header />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
