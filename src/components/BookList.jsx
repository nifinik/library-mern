import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books, onDelete, onToggleFavorite, onEdit }) => {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {books.map((book) => (
        <li
          key={book.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          {book.imageUrl && (
            <img
              src={book.imageUrl}
              alt={book.title}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                marginRight: "20px",
                borderRadius: "8px",
              }}
            />
          )}
          <div>
            <h2 style={{ margin: 0 }}>{book.title}</h2>
            <p style={{ margin: "5px 0" }}>Категория: {book.category}</p>
            <p style={{ margin: "5px 0" }}>Автор: {book.author}</p>
            <div style={{ marginTop: "10px" }}>
              <button onClick={() => onToggleFavorite(book.id)}>
                {book.favorite
                  ? "Удалить из избранного"
                  : "Добавить в избранное"}
              </button>
              <Link to={`/book/${book.id}`}>
                <button style={{ marginLeft: "10px" }}>Детали</button>
              </Link>
              {onEdit && (
                <button
                  onClick={() => onEdit(book)}
                  style={{ marginLeft: "10px" }}
                >
                  Редактировать
                </button>
              )}
              <button
                onClick={() => onDelete(book.id)}
                style={{ marginLeft: "10px" }}
              >
                Удалить
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
