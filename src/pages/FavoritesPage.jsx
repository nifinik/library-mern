import React, { useContext } from "react";
import { BookContext } from "../context/BookContext";
import BookList from "../components/BookList";

const FavoritesPage = () => {
  const { books, toggleFavorite, deleteBook } = useContext(BookContext);
  const favoriteBooks = books.filter((book) => book.favorite);

  return (
    <div>
      <h1>Избранные книги</h1>
      {favoriteBooks.length > 0 ? (
        <BookList
          books={favoriteBooks}
          onDelete={deleteBook}
          onToggleFavorite={toggleFavorite}
        />
      ) : (
        <p>Нет избранных книг</p>
      )}
    </div>
  );
};

export default FavoritesPage;
