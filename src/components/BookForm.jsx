import React, { useState, useEffect } from "react";

const BookForm = ({ onSubmit, onCancel, initialData }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    pages: "",
    category: "Фантастика",
    imageBase64: null,
    pdfBase64: null,
  });

  useEffect(() => {
    if (initialData) {
      setBook({
        ...initialData,
        imageBase64: initialData.imageBase64 || null,
        pdfBase64: initialData.pdfBase64 || null,
      });
    }
  }, [initialData]);

  // Конвертация PDF в Base64
  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Обработка загрузки PDF
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertFileToBase64(file);
      setBook({ ...book, pdfBase64: base64 });
    }
  };

  // Обработка текстовых полей
  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...book, id: initialData ? initialData.id : Date.now() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="Название"
        value={book.title}
        onChange={handleInputChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        name="author"
        placeholder="Автор"
        value={book.author}
        onChange={handleInputChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <textarea
        name="description"
        placeholder="Описание"
        value={book.description}
        onChange={handleInputChange}
        className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        name="pages"
        type="number"
        placeholder="Количество страниц"
        value={book.pages}
        onChange={handleInputChange}
        className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <label className="block">
        Категория:
        <select
          name="category"
          value={book.category}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Фантастика">Фантастика</option>
          <option value="Детективы">Детективы</option>
          <option value="Романы">Романы</option>
          <option value="Научные">Научные</option>
          <option value="Детские">Детские</option>
        </select>
      </label>

      {/* Поле для загрузки PDF */}
      <label className="block">
        Загрузить PDF:
        <input
          name="pdfFile"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600"
        />
        {book.pdfBase64 && (
          <p className="text-sm text-green-400 mt-2">PDF загружен успешно!</p>
        )}
      </label>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-primary text-light px-4 py-2 rounded"
        >
          {initialData ? "Сохранить изменения" : "Добавить книгу"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-600 text-light px-4 py-2 rounded"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default BookForm;
