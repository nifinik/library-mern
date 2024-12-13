import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books, onDelete, onToggleFavorite, onEdit }) => {
  return (
    <ul>
      {books.map((book) => (
        <li
          key={book.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          {book.imageUrl && (
            <img
              src={book.imageUrl}
              alt={book.title}
              style={{ width: "100px", height: "100px", marginRight: "20px" }}
            />
          )}
          <div>
            <h2>{book.title}</h2>
            <p>Автор: {book.author}</p>
            <button onClick={() => onToggleFavorite(book.id)}>
              {book.favorite ? "Удалить из избранного" : "Добавить в избранное"}
            </button>
            <Link to={`/book/${book.id}`}>Детали</Link>
            <button onClick={() => onEdit(book)}>Редактировать</button>
            <button onClick={() => onDelete(book.id)}>Удалить</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
