import React, { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(() => {
    // Загружаем данные из LocalStorage при первой загрузке
    const storedBooks = localStorage.getItem("books");
    return storedBooks ? JSON.parse(storedBooks) : [];
  });

  useEffect(() => {
    // Сохраняем данные в LocalStorage при каждом изменении списка книг
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => setBooks((prev) => [...prev, book]);

  const updateBook = (id, updatedBook) =>
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? updatedBook : book))
    );

  const deleteBook = (id) =>
    setBooks((prev) => prev.filter((book) => book.id !== id));

  const toggleFavorite = (id) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, favorite: !book.favorite } : book
      )
    );
  };

  return (
    <BookContext.Provider
      value={{ books, addBook, updateBook, deleteBook, toggleFavorite }}
    >
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
