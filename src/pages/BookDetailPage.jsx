import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BookContext } from "../context/BookContext";

const BookDetailPage = () => {
  const { id } = useParams();
  const { books } = useContext(BookContext);
  const navigate = useNavigate();

  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return <p className="text-gray-400">Книга не найдена</p>;
  }

  // Функция для открытия PDF в новой вкладке
  const openPdf = () => {
    const pdfWindow = window.open();
    pdfWindow.document.write(`
      <iframe
        src="${book.pdfBase64}"
        width="100%"
        height="100%"
        style="border:none;"
      ></iframe>
    `);
  };

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
      <div className="bg-gray-800 text-light p-6 rounded shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Изображение книги */}
          {book.imageBase64 ? (
            <img
              src={book.imageBase64}
              alt={book.title}
              className="w-full h-auto rounded shadow-md"
            />
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-600 rounded">
              <span className="text-lg">Нет изображения</span>
            </div>
          )}

          {/* Описание книги */}
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
        {book.pdfBase64 && (
          <button
            onClick={openPdf}
            className="bg-secondary text-light px-4 py-2 rounded mt-6 inline-block hover:bg-primary transition-all"
          >
            Открыть PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;
