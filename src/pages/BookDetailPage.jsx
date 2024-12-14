import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";

const BookDetailPage = () => {
  const { id } = useParams();
  const { books } = useContext(BookContext);
  const navigate = useNavigate();

  const book = books.find((b) => b.id === Number(id));

  if (!book) return <p className="text-gray-400">Книга не найдена</p>;

  return (
    <div className="p-4">
      {/* Кнопка "Назад" */}
      <button
        onClick={() => navigate(-1)}
        className="bg-primary text-light px-4 py-2 rounded mb-4 hover:bg-secondary"
      >
        Назад
      </button>

      {/* Карточка книги */}
      <div className="bg-zinc-700 text-light p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Левая часть: Изображение */}
          {book.imageUrl && (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-auto rounded shadow-md"
            />
          )}

          {/* Правая часть: Описание */}
          <div>
            <p className="text-lg">
              <strong>Автор:</strong> {book.author}
            </p>
            <p className="text-lg">
              <strong>Категория:</strong> {book.category}
            </p>
            <p className="text-lg">
              <strong>Описание:</strong> {book.description || "Нет описания"}
            </p>
            <p className="text-lg">
              <strong>Количество страниц:</strong> {book.pages || "Не указано"}
            </p>
          </div>
        </div>

        {/* Кнопка для открытия PDF */}
        {book.pdfUrl && (
          <a
            href={book.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-light px-4 py-2 rounded mt-6 inline-block hover:bg-primary transition-all"
          >
            Открыть PDF
          </a>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;
