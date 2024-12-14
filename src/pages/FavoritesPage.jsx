import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import BookList from "../components/BookList";

const FavoritesPage = () => {
  const { books, toggleFavorite, deleteBook } = useContext(BookContext);
  const navigate = useNavigate();

  // Фильтруем только избранные книги
  const favoriteBooks = books.filter((book) => book.favorite);

  return (
    <div>
      {/* Кнопка "Назад" */}
      <button
        onClick={() => navigate(-1)}
        className="bg-primary text-light px-4 py-2 rounded mb-4"
      >
        Назад
      </button>

      <h1 className="text-3xl font-bold mb-4">Избранные книги</h1>

      {favoriteBooks.length > 0 ? (
        <BookList
          books={favoriteBooks}
          onDelete={deleteBook}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <p className="text-lg text-gray-400">Нет избранных книг</p>
      )}
    </div>
  );
};

export default FavoritesPage;
