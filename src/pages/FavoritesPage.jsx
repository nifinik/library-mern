import React, { useContext } from "react";
import { BookContext } from "../context/BookContext";

const FavoritesPage = () => {
  const { books } = useContext(BookContext);
  const favoriteBooks = books.filter((book) => book.favorite);

  return (
    <div>
      <h1>Избранные книги</h1>
      {favoriteBooks.length > 0 ? (
        <ul>
          {favoriteBooks.map((book) => (
            <li key={book.id}>
              <h2>{book.title}</h2>
              <p>Автор: {book.author}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет избранных книг</p>
      )}
    </div>
  );
};

export default FavoritesPage;
