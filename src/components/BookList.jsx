import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books, onDelete, onToggleFavorite, onEdit }) => {
  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <li
          key={book.id}
          className="flex items-center gap-4 p-4 bg-gray-800 text-light rounded shadow-md"
        >
          {/* Проверка наличия изображения в Base64 */}
          {book.imageBase64 ? (
            <img
              src={book.imageBase64}
              alt={book.title}
              className="w-24 h-24 object-cover rounded"
            />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-gray-600 rounded">
              <span className="text-sm">Нет изображения</span>
            </div>
          )}

          <div className="flex-grow">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p>Категория: {book.category}</p>
            <p>Автор: {book.author}</p>
            <div className="mt-2 flex gap-2">
              <Link
                to={`/book/${book.id}`}
                className="bg-primary text-light px-4 py-2 rounded"
              >
                Детали
              </Link>
              <button
                className="bg-secondary text-light px-4 py-2 rounded"
                onClick={() => onToggleFavorite(book.id)}
              >
                {book.favorite
                  ? "Удалить из избранного"
                  : "Добавить в избранное"}
              </button>
              {onEdit && (
                <button
                  className="bg-blue-600 text-light px-4 py-2 rounded"
                  onClick={() => onEdit(book)}
                >
                  Редактировать
                </button>
              )}
              <button
                className="bg-red-600 text-light px-4 py-2 rounded"
                onClick={() => onDelete(book.id)}
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
