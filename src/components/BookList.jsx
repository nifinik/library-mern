import React from "react";
import { Link } from "react-router-dom";

const BookList = ({ books, onDelete, onToggleFavorite, onEdit }) => {
  return (
    <ul className="flex gap-4 flex-wrap">
      {books.map((book) => (
        <li
          key={book.id}
          className="flex items-center gap-4 p-4 bg-zinc-700 text-light rounded shadow-md flex-1"
        >
          {book.imageUrl && (
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-24 h-24 object-cover rounded"
            />
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
