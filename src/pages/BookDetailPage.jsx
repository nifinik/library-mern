import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";

const BookDetailPage = () => {
  const { id } = useParams();
  const { books } = useContext(BookContext);
  const navigate = useNavigate();

  const book = books.find((b) => b.id === Number(id));

  if (!book) return <p>Книга не найдена</p>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>Назад</button> {/* Кнопка "Назад" */}
      <h1>{book.title}</h1>
      <p>Автор: {book.author}</p>
      <p>Описание: {book.description}</p>
      <p>Страниц: {book.pages}</p>
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={book.title}
          style={{ width: "200px", height: "auto", marginBottom: "20px" }}
        />
      )}
      <button
        onClick={() => {
          if (book.pdfUrl) {
            window.open(book.pdfUrl, "_blank");
          }
        }}
      >
        Открыть PDF
      </button>
    </div>
  );
};

export default BookDetailPage;
